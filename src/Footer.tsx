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
        <div className="item">
          <img className="logo" src="/static/gmail-logo.png" alt="" />{" "}
          <a href="http://mail.highviewptfa.org.uk">Committee member email</a>
        </div>
        <div className="item">
          <img className="logo" src="/static/google-drive-logo.png" alt="" />{" "}
          <a href="http://drive.highviewptfa.org.uk">Committee member drive</a>
        </div>
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

        .logo {
          height: 14px;
        }
      `}</style>
    </footer>
  );
};
