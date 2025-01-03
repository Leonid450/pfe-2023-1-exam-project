import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import cx from 'classnames';
import Footer from '../../components/Footer/Footer';
import styles from './HowItWorks.module.sass';
import Spinner from '../../components/Spinner/Spinner';

const HowItWorks = (props) => {
  const { isFetching } = props;

  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <section className={styles.Container}>
            <div className={styles.left}>
              <h3 className={styles.naming}>World's #1 Naming Platform</h3>
              <h1 className={styles.headerContainer}>How Does It Work?</h1>

              <p className={styles.innerText}>
                Squadhelp helps you come up with a great name for your business
                by combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
              <button className={styles.btn}>Play Video</button>
            </div>
            <img
              className={styles.right}
              src="https://www.atom.com/resources/assets/svg/illustrations/app-user.svg"
              alt="some img"
            />
          </section>
          <section className={styles.servesBackground}>
            <div className={styles.servesContainer}>
              <div className={styles.servesContainerInnerCommon}>
                <span className={styles.servesContainerHeader}>
                  Our Services
                </span>
                <div>
                  <h2 className={styles.servesContainerWays}>
                    3 Ways To Use Atom
                  </h2>
                  <p>
                    Atom offers 3 ways to get you a perfect name for your
                    business.
                  </p>
                </div>
              </div>
              <ul className={styles.servesContainerList}>
                <li className={styles.servesContainerListItem}>
                  <div>
                    <img
                      src="https://www.atom.com/html/html/static_images/contests/g1.svg"
                      alt="someimg"
                    ></img>
                  </div>
                  <h3 className={styles.servesContainerListItemHeader}>
                    Launch a Contest
                  </h3>
                  <p>
                    Work with hundreds of creative experts to get custom name
                    suggestions for your business or brand. All names are
                    auto-checked for URL availability.
                  </p>
                  <button className={styles.servesContainerListItemBtn}>
                    <a href="https://www.atom.com/start-contest">
                      Launch a Contest
                    </a>
                  </button>
                </li>
                <li className={styles.servesContainerListItem}>
                  <div>
                    <img
                      src="https://www.atom.com/html/html/static_images/contests/g2.svg"
                      alt="someimg"
                    ></img>
                  </div>
                  <h3 className={styles.servesContainerListItemHeader}>
                    Explore Names For Sale
                  </h3>
                  <p>
                    Our branding team has curated thousands of pre-made names
                    that you can purchase instantly. All names include a
                    matching URL and a complimentary Logo Design.
                  </p>
                  <button className={styles.servesContainerListItemBtn}>
                    Explore Names For Sale
                  </button>
                </li>
                <li className={styles.servesContainerListItem}>
                  <div>
                    <img
                      src="https://www.atom.com/html/html/static_images/contests/g3.svg"
                      alt="someimg"
                    ></img>
                  </div>
                  <h3 className={styles.servesContainerListItemHeader}>
                    Agency-level Managed Contests
                  </h3>
                  <p>
                    Our Managed contests combine the power of crowdsourcing with
                    the rich experience of our branding consultants. Get a
                    complete agency-level experience at a fraction of Agency
                    costs
                  </p>
                  <button className={styles.servesContainerListItemBtn}>
                    Learn More
                  </button>
                </li>
              </ul>
            </div>
          </section>
          <section className={styles.containerHow}>
            <div className={styles.containerHowHeader}>
              <img
                src="https://www.atom.com/resources/assets/svg/icons/icon-27.svg"
                alt="cup"
              />
              <h3>How Do Naming Contests Work?</h3>
            </div>
            <ul className={styles.containerStepList}>
              <li className={cx(styles.stepItem, styles.stepItemAfter)}>
                <span>Step 1</span>
                <p>
                  Fill out your Naming Brief and begin receiving name ideas in
                  minutes
                </p>
              </li>
              <li className={cx(styles.stepItem, styles.stepItemAfter)}>
                <span>Step 2</span>
                <p>
                  Rate the submissions and provide feedback to creatives.
                  Creatives submit even more names based on your feedback.
                </p>
              </li>
              <li className={cx(styles.stepItem, styles.stepItemAfter)}>
                <span>Step 3</span>
                <p>
                  Our team helps you test your favorite names with your target
                  audience. We also assist with Trademark screening.
                </p>
              </li>
              <li className={styles.stepItem}>
                <span>Step 4</span>
                <p>Pick a Winner. The winner gets paid for their submission.</p>
              </li>
            </ul>
          </section>
          <article className={styles.faqConteiner}>
            <div className={styles.faqMenu}>
              <h3>Frequently Asked Questions</h3>
            </div>
            <ul className={styles.faqList}>
              <li className={styles.faqItem}>Launching A Contest</li>
              <li className={styles.faqItem}>Buying From Marketplace</li>
              <li className={styles.faqItem}>Managed Contests</li>
              <li className={styles.faqItem}>For Creatives</li>
            </ul>
            <section className={styles.lauching}>
              <h4>Launching A Contest</h4>
              <ul className={styles.lauchingList}>
                <li className={styles.lauchingListItem}>
                  <p>How long does it take to start receiving submissions?</p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      For Naming contests, you will start receiving your
                      submissions within few minutes of launching your contest.
                      Since our creatives are located across the globe, you can
                      expect to receive submissions 24 X 7 throughout the
                      duration of the brainstorming phase.
                    </p>
                  </div>
                </li>
                <li className={styles.lauchingListItem}>
                  <p>How long do Naming Contests last? </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      You can choose a duration from 1 day to 7 days. We
                      recommend a duration of 3 Days or 5 Days. This allows for
                      sufficient time for entry submission as well as
                      brainstorming with creatives. If you take advantage of our
                      validation services such as Audience Testing and Trademark
                      Research, both will be an additional 4-7 days (3-5
                      business days for Audience Testing and 1-2 business days
                      for Trademark Research).
                    </p>
                  </div>
                </li>
                <li className={styles.lauchingListItem}>
                  <p>Where are the creatives located? </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      About 70% of our Creatives are located in the United
                      States and other English speaking countries (i.e. United
                      Kingdom, Canada, and Australia.). We utilize an advanced
                      rating score algorithm to ensure that high quality
                      creatives receive more opportunities to participate in our
                      contests.
                    </p>
                  </div>
                </li>{' '}
                <li className={styles.lauchingListItem}>
                  <p>What if I do not like any submissions?</p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      While it is unusually rare that you will not like any
                      names provided, we have a few options in case this problem
                      occurs: If the contest ends and you have not yet found a
                      name that you’d like to move forward with, we can provide
                      complimentary extension of your contest as well as a
                      complimentary consultation with one of our branding
                      consultants (a $99 value). By exploring our premium domain
                      marketplace you can apply the contest award towards the
                      purchase of any name listed for sale. If you choose the
                      Gold package or Platinum package and keep the contest as
                      'Not Guaranteed', you can request a partial refund if you
                      choose not to move forward with any name from you project.
                      (Please note that the refund is for the contest award).
                      Here is a link to our Refund Policy
                    </p>
                  </div>
                </li>{' '}
                <li className={styles.lauchingListItem}>
                  <p>How much does it cost? </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      Our naming competitions start at $299, and our logo design
                      competitions start at $299. Also, there are three
                      additional contest level that each offer more features and
                      benefits. See our Pricing Page for details
                    </p>
                  </div>
                </li>{' '}
                <li className={styles.lauchingListItem}>
                  <p>
                    I need both a Name and a Logo. Do you offer any discount for
                    multiple contests?
                  </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      Yes! We have many contest bundles - our most popular being
                      our Name, Tagline, and Logo bundle. Bundles allow you to
                      purchase multiple contests at one time and save as much as
                      from $75 - $400. You can learn more about our bundle
                      options on our Pricing Page.
                    </p>
                  </div>
                </li>
                <li className={styles.lauchingListItem}>
                  <p>What if I want to keep my business idea private?</p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      You can select a Non Disclosure Agreement (NDA) option at
                      the time of launching your competition. This will ensure
                      that only those contestants who agree to the NDA will be
                      able to read your project brief and participate in the
                      contest. The contest details will be kept private from
                      other users, as well as search engines.
                    </p>
                  </div>
                </li>
                <li className={styles.lauchingListItem}>
                  <p>Can you serve customers outside the US? </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      Absolutely. Atom services organizations across the globe.
                      Our customer come from many countries, such as the United
                      States, Australia, Canada, Europe, India, and MENA. We've
                      helped more than 25,000 customer around the world.
                    </p>
                  </div>
                </li>
                <li className={styles.lauchingListItem}>
                  <p>Can I see any examples? </p>
                  <div className={styles.lauchingListItemHide}>
                    <p>
                      Our creatives have submitted more than 6 Million names and
                      thousands of logos on our platform. Here are some examples
                      of Names, Taglines, and Logos that were submitted in
                      recent contests. Name Examples Tagline Examples Logo
                      Examples
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </article>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(HowItWorks);
