import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat64 "mo:core/Nat64";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Principal "mo:core/Principal";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Retained for upgrade compatibility (previously used for OpenAI integration)
  stable var openAIApiKey : Text = "";
  stable var systemPrompt : Text = "";

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Blog Post Types and Storage
  public type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    date : Time.Time;
    tags : [Text];
    slug : Text;
    readTime : Nat;
  };

  module BlogPost {
    public func compare(blog1 : BlogPost, blog2 : BlogPost) : Order.Order {
      Nat.compare(blog1.id, blog2.id);
    };
  };

  let blogPosts = Map.empty<Nat, BlogPost>();
  var nextPostId = 1;

  // Contact Form Types and Storage
  public type ContactFormEntry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let contacts = List.empty<ContactFormEntry>();

  // FAQ Type
  public type FAQEntry = {
    question : Text;
    answer : Text;
  };

  // Chatbot Log Types and Storage
  public type ChatbotLog = {
    id : Nat;
    question : Text;
    answer : Text;
    timestamp : Time.Time;
  };

  var nextLogId = 1;
  let chatbotLogs = Map.empty<Nat, ChatbotLog>();

  // ─── Email/Password Admin Auth ───────────────────────────────────────────────
  stable var adminEmail : ?Text = ?"amiyadav410@gmail.com";
  stable var adminPassword : ?Text = ?"RankPro@2026";
  stable var adminCredentialsSet : Bool = true;
  let adminSessions = Map.empty<Text, Time.Time>();

  public query func hasAdminSetup() : async Bool {
    adminCredentialsSet and adminEmail != null;
  };

  public shared ({ caller }) func setupAdminCredentials(email : Text, password : Text) : async Bool {
    if (adminCredentialsSet) {
      if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
        Runtime.trap("Unauthorized: Only admins can reset credentials");
      };
    };
    adminEmail := ?email;
    adminPassword := ?password;
    adminCredentialsSet := true;
    for ((token, _) in adminSessions.entries()) {
      adminSessions.remove(token);
    };
    true;
  };

  public shared func loginAdmin(email : Text, password : Text) : async ?Text {
    switch (adminEmail, adminPassword) {
      case (?storedEmail, ?storedPass) {
        if (storedEmail == email and storedPass == password) {
          let token = "tok-" # Nat64.fromIntWrap(Time.now()).toText();
          let expiry = Time.now() + 86_400_000_000_000;
          adminSessions.add(token, expiry);
          ?token;
        } else {
          null;
        };
      };
      case _ { null };
    };
  };

  public query func verifyAdminToken(token : Text) : async Bool {
    switch (adminSessions.get(token)) {
      case (?expiry) { Time.now() < expiry };
      case null { false };
    };
  };

  public shared func logoutAdmin(token : Text) : async () {
    adminSessions.remove(token);
  };

  public shared func changeAdminPassword(email : Text, oldPassword : Text, newPassword : Text) : async Bool {
    switch (adminEmail, adminPassword) {
      case (?storedEmail, ?storedPass) {
        if (storedEmail == email and storedPass == oldPassword) {
          adminPassword := ?newPassword;
          for ((token, _) in adminSessions.entries()) {
            adminSessions.remove(token);
          };
          true;
        } else {
          false;
        };
      };
      case _ { false };
    };
  };

  public query func getContactSubmissionsWithToken(token : Text) : async [ContactFormEntry] {
    switch (adminSessions.get(token)) {
      case (?expiry) {
        if (Time.now() < expiry) {
          contacts.toArray();
        } else {
          Runtime.trap("Session expired");
        };
      };
      case null { Runtime.trap("Invalid token") };
    };
  };

  public query func getChatbotLogsWithToken(token : Text) : async [ChatbotLog] {
    switch (adminSessions.get(token)) {
      case (?expiry) {
        if (Time.now() < expiry) {
          chatbotLogs.values().toArray();
        } else {
          Runtime.trap("Session expired");
        };
      };
      case null { Runtime.trap("Invalid token") };
    };
  };

  // Blog Post Methods
  public shared ({ caller }) func createBlogPost(title : Text, excerpt : Text, content : Text, tags : [Text], slug : Text, readTime : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let id = nextPostId;
    let post : BlogPost = {
      id;
      title;
      excerpt;
      content;
      date = Time.now();
      tags;
      slug;
      readTime;
    };
    blogPosts.add(id, post);
    nextPostId += 1;
    id;
  };

  public query func listBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public query func getBlogPostById(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public shared func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let entry : ContactFormEntry = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contacts.add(entry);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactFormEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contacts.toArray();
  };

  public query func getFAQs() : async [FAQEntry] {
    [
      { question = "What is SEO?"; answer = "SEO stands for Search Engine Optimization. It's the process of improving your website to increase its visibility when people search for products or services related to your business on Google and other search engines." },
      { question = "How long does it take to see SEO results?"; answer = "SEO results can take anywhere from 3 to 6 months to start showing significant improvements, depending on the competitiveness of your industry and the intensity of your SEO efforts." },
      { question = "What are keywords in SEO?"; answer = "Keywords are the words and phrases that people type into search engines to find what they're looking for. In SEO, keywords refer to the words and phrases that are strategically placed on your website to attract search engine traffic." },
      { question = "Why is link building important for SEO?"; answer = "Link building is important because search engines like Google use links as a ranking factor. High-quality backlinks from authoritative sites can help improve your website's search engine ranking." },
      { question = "Can I do SEO myself?"; answer = "Yes, you can handle basic SEO tasks yourself, but working with an expert can help you develop a more effective strategy and achieve better results." },
    ];
  };

  public shared func logChatbotMessage(question : Text, answer : Text) : async () {
    let logEntry : ChatbotLog = {
      id = nextLogId;
      question;
      answer;
      timestamp = Time.now();
    };
    chatbotLogs.add(nextLogId, logEntry);
    nextLogId += 1;
  };

  public query ({ caller }) func getChatbotLogs() : async [ChatbotLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view chatbot logs");
    };
    chatbotLogs.values().toArray();
  };
};
