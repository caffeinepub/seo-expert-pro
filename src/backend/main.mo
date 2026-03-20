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

actor {
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

  let contacts = List.empty<ContactFormEntry>();

  public type ContactFormEntry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type FAQEntry = {
    question : Text;
    answer : Text;
  };

  // Blog Post Methods
  public shared ({ caller }) func createBlogPost(title : Text, excerpt : Text, content : Text, tags : [Text], slug : Text, readTime : Nat) : async Nat {
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

  public query ({ caller }) func listBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public query ({ caller }) func getBlogPostById(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  // Contact Form Methods
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
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
    contacts.toArray();
  };

  // FAQ Section
  public query ({ caller }) func getFAQs() : async [FAQEntry] {
    [
      {
        question = "What is SEO?";
        answer = "SEO stands for Search Engine Optimization. It's the process of improving your website to increase its visibility when people search for products or services related to your business on Google and other search engines.";
      },
      {
        question = "How long does it take to see SEO results?";
        answer = "SEO results can take anywhere from 3 to 6 months to start showing significant improvements, depending on the competitiveness of your industry and the intensity of your SEO efforts.";
      },
      {
        question = "What are keywords in SEO?";
        answer = "Keywords are the words and phrases that people type into search engines to find what they're looking for. In SEO, keywords refer to the words and phrases that are strategically placed on your website to attract search engine traffic.";
      },
      {
        question = "Why is link building important for SEO?";
        answer = "Link building is important because search engines like Google use links as a ranking factor. High-quality backlinks from authoritative sites can help improve your website's search engine ranking.";
      },
      {
        question = "Can I do SEO myself?";
        answer = "Yes, you can handle basic SEO tasks yourself, but working with an expert can help you develop a more effective strategy and achieve better results.";
      },
    ];
  };
};
