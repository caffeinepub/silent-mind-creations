import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Time "mo:core/Time";

actor {
  // Data Types
  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Int;
  };

  module ContactForm {
    public func compare(form1 : ContactForm, form2 : ContactForm) : Order.Order {
      switch (Int.compare(form1.submittedAt, form2.submittedAt)) {
        case (#equal) { Text.compare(form1.email, form2.email) };
        case (order) { order };
      };
    };
  };

  type MovieDetails = {
    title : Text;
    synopsis : Text;
    genre : Text;
    releaseDate : Text;
    castList : [Text];
  };

  // Persistent State
  let newsletterEmails = List.empty<Text>();
  let contactForms = List.empty<ContactForm>();
  let movieDetailsMap = Map.empty<Text, MovieDetails>();

  // Newsletter Signup
  public shared ({ caller }) func subscribe(email : Text) : async () {
    let alreadySubscribed = newsletterEmails.values().any(
      func(existingEmail) { existingEmail == email }
    );

    if (alreadySubscribed) {
      Runtime.trap("Email already subscribed");
    };

    newsletterEmails.add(email);
  };

  // Contact Form Submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let form : ContactForm = {
      name;
      email;
      message;
      submittedAt = Time.now();
    };
    contactForms.add(form);
  };

  // Movie Info Storage
  public shared ({ caller }) func setMovieDetails(identifier : Text, title : Text, synopsis : Text, genre : Text, releaseDate : Text, castList : [Text]) : async () {
    let details : MovieDetails = {
      title;
      synopsis;
      genre;
      releaseDate;
      castList;
    };
    movieDetailsMap.add(identifier, details);
  };

  // Queries
  public query ({ caller }) func getNewsletterEmails() : async [Text] {
    newsletterEmails.toArray();
  };

  public query ({ caller }) func getContactForms() : async [ContactForm] {
    contactForms.toArray().sort();
  };

  public query ({ caller }) func getMovieDetails(identifier : Text) : async MovieDetails {
    switch (movieDetailsMap.get(identifier)) {
      case (null) { Runtime.trap("Movie details not found") };
      case (?details) { details };
    };
  };

  public query ({ caller }) func getAllMovieDetails() : async [MovieDetails] {
    movieDetailsMap.values().toArray();
  };
};
