import React from "react";
import { Link } from "react-router";


const Contact = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to get started?</h3>
        <p className="mb-6">Join AssetVerse and start managing assets the smarter way.</p>

        <div className="flex justify-center gap-4">
          <Link to="/auth/signup-user" className="btn btn-white text-primary">Create Account</Link>
          <Link to="/auth/login" className="btn btn-outline btn-white">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
