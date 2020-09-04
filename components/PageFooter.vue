<template>
  <footer class="myFooter pt-4 bg-light">
    <div class="container mt-4">
      <div class="row justify-content-center">

        <div class="col-12 col-md-5 my-3">
          <p class="text-center footerMenuItemHeading">Connect with me on</p>

          <ul class="contactIcons my-5">
            <li>
              <a href="mailto:selfreviewer@gmail.com?subject=Contacting You From Your Website"
                 target="_blank">
                <svg class="iconSets" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512"
                     x="0px" xml:space="preserve" y="0px">
                                <rect height="384" style="fill:#ECEFF1;" width="384" x="64" y="64"></rect>
                  <polygon points="256,296.384 448,448 448,148.672 " style="fill:#CFD8DC;"></polygon>
                  <path d="M464,64h-16L256,215.616L64,64H48C21.504,64,0,85.504,0,112v288c0,26.496,21.504,48,48,48h16V148.672
	                            l192,147.68L448,148.64V448h16c26.496,0,48-21.504,48-48V112C512,85.504,490.496,64,464,64z"
                        style="fill:#F44336;"></path>
                            </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/self_review_/" rel="noreferrer noopener" target="_blank">
                <svg class="iconSets" enable-background="new 0 0 24 24" viewBox="0 0 24 24">
                  <linearGradient id="SVGID_1_"
                                  gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)"
                                  gradientUnits="userSpaceOnUse" x1="-37.106" x2="-26.555" y1="-72.705"
                                  y2="-84.047">
                    <stop offset="0" stop-color="#fd5"></stop>
                    <stop offset=".5" stop-color="#ff543e"></stop>
                    <stop offset="1" stop-color="#c837ab"></stop>
                  </linearGradient>
                  <path
                      d="m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41 1.633z"
                      fill="url(#SVGID_1_)"></path>
                  <path
                      d="m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z"
                      fill="#fff"></path>
                </svg>
              </a>
            </li>
          </ul>

          <div class="text-center my-4">
            <button class="btn accentButton px-4 mb-4" data-target="#contactForm" data-toggle="modal">Leave a
              Message
            </button>
            <br>
            <svg class="align-top" height="1.3rem" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512"
                 width="1.3rem" x="0px"
                 xml:space="preserve" xmlns="http://www.w3.org/2000/svg" y="0px">
                        <path d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
                            c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
                            C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
                            C346,228.9,306.999,270,256,270z" style="fill:#FD003A;"></path>
                    </svg>
            <span style="color: #555; letter-spacing: 1px">West Bengal, India</span>

          </div>

        </div>

        <div class="col-12 col-md-5 my-3">
          <p class="text-center footerMenuItemHeading">Menu</p>
          <ul class="footer-nav">
            <li><a href="{% url 'LandingPage' %}">Home</a></li>
            <li><a href="{% url 'BlogHome' %}">Review Blog</a></li>
            <li><a href="{% url 'ShoppingPage' %}">Shopping</a></li>
            <li><a href="{% url 'AboutPage' %}">About</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="text-center mt-2 mb-5">
      <a class="footer-nav-link" href="#">Back to Top</a>
      <p class="my-3 copyrightText">&copy; Self Reviewer <span>&copy; {{ new Date().getFullYear() }}</span></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter"
}
</script>

<style lang="scss" scoped>
@import 'assets/themeData';

.myFooter {
  width: 100%;
  background: #EEE;
  border: 1px solid transparent;

  .contactIcons {
    padding: 0;
    display: flex;
    list-style: none;
    justify-content: space-evenly;

    .iconSets {
      width: 3rem;
      height: 3rem;
    }
  }

  .footerMenuItemHeading {
    position: relative;
    margin-bottom: 2rem;
    color: $primary;
    text-shadow: 0 0 5px rgba(60, 60, 60, .1);
    font-size: 24px;
    letter-spacing: 1px;
    font-family: $serif;
  }

  .footerMenuItemHeading::after {
    content: '';
    position: absolute;
    width: 6rem;
    height: 1px;
    background-color: red;
    bottom: -.5rem;
    left: calc(50% - 3rem);
  }

  .footer-nav {
    list-style: none;
    padding: 0;

    li {
      text-align: center;
      margin: 1rem 0;

      a {
        font-family: $navigationFont;
        font-weight: 300;
        letter-spacing: 1px;
        font-size: 20px;
        text-decoration: none;
        color: $semiDark;
        text-shadow: 0 0 5px rgba(60, 60, 60, .1);

        &:hover {
          color: $secondary;
        }
      }

    }
  }

  .footer-nav-link {
    font-family: $navigationFont;
    font-weight: 300;
    letter-spacing: 1px;
    text-decoration: none;
    color: $semiDark;
    text-shadow: 0 0 5px rgba(60, 60, 60, .1);


    &:hover {
      color: $secondary;
    }
  }

  .copyrightText {
    font-weight: 300;
    font-size: 20px;
    color: darken($indicatorHighlight, 5%);
    letter-spacing: 1px;
    text-shadow: 0 0 5px rgba(60, 60, 60, .1);
  }
}
</style>
