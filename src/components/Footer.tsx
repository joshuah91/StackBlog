import react from "react";
import styles from "@/styles/Nav.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <h4>Let’s get started on something great</h4>
      <p>Join over 4,000+ startups already growing with Untitled.</p>
      <button>Get Started</button>
      <div className={styles.tiles}>
        <div className={styles.column}>
          <h6>Products</h6>
          <ul>
            <li>Overview</li>
            <li>Features</li>
            <li>Solutions</li>
            <li>Tutorials</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h6>Company</h6>
          <ul>
            <li>About us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>News</li>
            <li>Media Kit</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h6>Resources</h6>
          <ul>
            <li>Blog</li>
            <li>Newsletter</li>
            <li>Events</li>
            <li>Help centre</li>
            <li>Tutorials</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h6>Social</h6>
          <ul>
            <li>Twitter</li>
            <li>Linkedin</li>
            <li>Facebook</li>
            <li>Github</li>
            <li>Dribble</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h6>Legal</h6>
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Licenses</li>
            <li>Settings</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className={styles.end}>
        <h6>Stackbuld</h6>
        <p>© 2077 Untitled UI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
