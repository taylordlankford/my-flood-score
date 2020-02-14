import React from "react";

const RecommendationFooter = () => {
  return (
    <div
      style={{
        marginTop: "40px",
        fontSize: "20px",
        backgroundColor: "#C7AE4A",
        color: "#fff",
        padding: "4px 40px 4px 40px",
        textAlign: "center",
        height: "max-content"
      }}
    >
      Learn more about the LOMA by visiting our{" "}
      <u>
        <a
          href="https://www.nofloodflorida.com/loma/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LOMA
        </a>
      </u>{" "}
      page or <span style={{ color: "#000" }}>Call 813-213-0641</span>
    </div>
  );
};

export default RecommendationFooter;
