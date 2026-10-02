import "./Home.css";

// Images
import phone1 from "../assets/phone1.png";
import phone2 from "../assets/phone2.png";
import phone3 from "../assets/phone3.png";

import frame6 from "../assets/logos/Frame-6.png";
import frame7 from "../assets/logos/Frame-7.png";
import frame8 from "../assets/logos/Frame-8.webp";
import frame10 from "../assets/logos/Frame-10.webp";

export default function Home() {
  return (
    <main className="bk-home">

      {/* HERO */}
      <section className="bk-hero">
        <div className="bk-hero-left">
          <h1>
            The easiest way to <br />
            <span>track expenses & budgets</span>
          </h1>

          <p>
            PennyPocket helps you record expenses, manage budgets and clearly
            understand where your money goes.
          </p>

          <div className="bk-actions">
            <button className="bk-primary">
              Get started free
            </button>

            <button className="bk-secondary">
              View demo
            </button>
          </div>

          <div className="bk-rating">
            ⭐⭐⭐⭐⭐ <span>4.8 rating • 10,000+ users</span>
          </div>
        </div>

        <div className="bk-hero-right">
          <img src={phone1} alt="app preview" />
        </div>
      </section>


      {/* TRUST */}
      <section className="bk-trust">
        <p className="bk-trust-title">
          Trusted everywhere by freelancers and businesses
        </p>

        <div className="logo-slider">
          <div className="logo-track">

            <img src={frame8} alt="logo" />
            <img src={frame6} alt="logo" />
            <img src={frame7} alt="logo" />
            <img src={frame8} alt="logo" />
            <img src={frame6} alt="logo" />
            <img src={frame10} alt="logo" />

            <img src={frame7} alt="logo" />
            <img src={frame8} alt="logo" />
            <img src={frame6} alt="logo" />
            <img src={frame10} alt="logo" />

          </div>
        </div>
      </section>


      {/* BENEFITS */}
      <section className="bk-benefits">
        <h2>Know your money. Control your future.</h2>

        <div className="bk-benefit-grid">

          <div>
            <h4>Track every expense</h4>
            <p>
              Never lose track of where your money goes.
            </p>
          </div>

          <div>
            <h4>Create smart budgets</h4>
            <p>
              Plan monthly budgets and reduce overspending.
            </p>
          </div>

          <div>
            <h4>Clear insights</h4>
            <p>
              Visual charts that make sense instantly.
            </p>
          </div>

        </div>
      </section>


      {/* FEATURE 1 */}
      <section className="bk-row">

        <img src={phone2} alt="feature" />

        <div>
          <h3>Track expenses in seconds</h3>

          <p>
            Quickly add income and expenses with categories and notes.
          </p>
        </div>

      </section>


      {/* FEATURE 2 */}
      <section className="bk-row reverse">

        <div>
          <h3>Understand spending habits</h3>

          <p>
            See spending patterns and improve financial habits.
          </p>
        </div>

        <img src={phone3} alt="feature" />

      </section>


      {/* USE CASE */}
      <section className="bk-use">

        <h2>Made for everyone</h2>

        <div className="bk-use-grid">

          <div>Students</div>
          <div>Freelancers</div>
          <div>Families</div>
          <div>Small businesses</div>

        </div>

      </section>


      {/* STEPS */}
      <section className="bk-steps">

        <h2>How it works</h2>

        <div className="bk-step-grid">

          <div>Add transactions</div>
          <div>Track & analyze</div>
          <div>Save more money</div>

        </div>

      </section>


      {/* CTA */}
      <section className="bk-cta-section">

        <h2>Get started in minutes</h2>

        <button className="bk-primary big">
          Start tracking now
        </button>

      </section>


      {/* FAQ */}
      <section className="bk-faq">

        <h2>Frequently asked questions</h2>

        <details>
          <summary>Is PennyPocket free?</summary>

          <p>
            Yes, you can use the core features for free.
          </p>
        </details>

        <details>
          <summary>Is my data safe?</summary>

          <p>
            Your data stays securely in your browser.
          </p>
        </details>

        <details>
          <summary>Can I use it for business?</summary>

          <p>
            Yes, it works for personal and small business use.
          </p>
        </details>

      </section>


      {/* FINAL CTA */}
      <section className="bk-final">

        <h2>Start managing your money today</h2>

        <button className="bk-primary big">
          Get started free
        </button>

      </section>

    </main>
  );
}