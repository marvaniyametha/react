import React from "react";
import { Container } from "react-bootstrap";
import "./FAQ.css";

const FAQSection = () => {
  return (
    <section className="faq-section text-center py-5">
      <Container>
        <h2 className="fw-semibold mb-4">Frequently Asked Questions</h2>

        <div className="faq-image-container">
          <img
            src="https://glowing-theme.myshopify.com/cdn/shop/files/banner-35.jpg?v=1736741145"
            alt="FAQ"
            className="faq-image"
          />
         
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
