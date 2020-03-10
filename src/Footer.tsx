import React from "react";

export const Footer = () => {
  return (
    <footer>
      <div className="section">
        <div className="item">
          Contact us via email:{" "}
          <a href="mailto:committee@highviewptfa.org.uk">
            committee@highviewptfa.org.uk
          </a>
        </div>
      </div>
      <div className="section">
        <a className="item" href="http://mail.highviewptfa.org.uk">
          Committe member email
        </a>
        <a className="item" href="http://drive.highviewptfa.org.uk">
          Committe member drive
        </a>
      </div>
      <style jsx>{`
        footer {
          background: #dfe4e0;
          color: #888888;
          display: flex;
          flex-wrap: wrap;
        }

        a {
          color: #628cbf;
        }

        .section {
          padding: 2rem;
          flex: 1 1 500px;
          text-align: center;
        }

        .item {
          display: block;
          margin: 1rem 0;
        }
      `}</style>
    </footer>
  );
};
