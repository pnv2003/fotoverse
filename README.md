<!-- Improved compatibility of back to top link: See: https://github.com/phuongngo0320/fotoverse/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/phuongngo0320/fotoverse">
    <img src="public/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Fotoverse</h3>

  <p align="center">
    A Social Media Platform Inspired by Instagram
    <br />
    <a href="https://github.com/phuongngo0320/fotoverse"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/phuongngo0320/fotoverse">View Demo</a>
    ·
    <a href="https://github.com/phuongngo0320/fotoverse/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/phuongngo0320/fotoverse/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project is the culmination of the 2024 Summer Internship Program at [NUS Technology](https://www.nustechnology.com). As part of the internship, I am trained extensively in the role of a backend engineer, utilizing the Ruby on Rails framework to develop a feature-rich, Instagram-like social media web application. The project focuses on building a scalable and maintainable backend architecture, implementing robust APIs, and managing complex data models to support the application's functionalities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)
- ![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
- ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Ensure you have Ruby and Rails installed on your system. Detailed installation instructions can be found at the [RVM website](https://rvm.io).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/phuongngo0320/fotoverse
   cd fotoverse
   ```
2. Configure the database

    Open the `config/database.yml` file in your project directory. Update the default settings with your database credentials. Here's an example configuration for a PostgreSQL database:

    ```yaml

    default: &default
    adapter: postgresql
    encoding: unicode
    pool: 5
    username: <your-database-username>
    password: <your-database-password>
    host: <your-database-host>

    development:
    <<: *default
    database: <your-development-database>

    test:
    <<: *default
    database: <your-test-database>

    production:
    <<: *default
    database: <your-production-database>
    ```

3. Install dependencies
   ```sh
   bundle install
   ```
4. Initialize the database

    ```sh
    rails db:create db:migrate db:seed
    ```
5. Serve

    ```sh
    rails server
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This section is under construction. In the meantime, feel free to explore the app!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add changelog
- [ ] Search content
- [x] Lazy loading user content
- [x] Multi-language support
    - [x] English
    - [x] Vietnamese
- [x] SMTP mail server configuration
- [x] Third-party authentication services integration
    - [x] Google OAuth2
    - [x] Facebook Login
    - [x] Twitter OAuth 2.0
- [ ] Real-time notifications with WebSocket
- [x] Deploy app to [Render](https://render.com)

See the [open issues](https://github.com/phuongngo0320/fotoverse/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

This project is currently unlicensed. If you wish to use, modify, or distribute this code, please contact the author for permission. License terms may be added in the future, so please check back for updates.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Phuong Ngo - phuongngovan2003@gmail.com

Project Link: [https://github.com/phuongngo0320/fotoverse](https://github.com/phuongngo0320/fotoverse)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I would like to express my sincere gratitude to the following individuals and organizations for their support and contributions to this project:

- [NUS Technology](https://nustechnology.com): For providing the opportunity to undertake this internship and for their continuous support and mentorship throughout the project.

- Mentors Nhan Nguyen, [Kiet Nguyen](https://github.com/kieetnvt), [Tam Le](https://github.com/kokorolx), Tien Nguyen: For their invaluable guidance, insights, and encouragement during the development of this application.

<!-- - Team Members: For their collaboration, ideas, and hard work in making this project a success. -->

- Ruby on Rails Community: For the extensive documentation and helpful resources that made learning and implementing the framework much easier.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/phuongngo0320/fotoverse.svg?style=for-the-badge
[contributors-url]: https://github.com/phuongngo0320/fotoverse/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/phuongngo0320/fotoverse.svg?style=for-the-badge
[forks-url]: https://github.com/phuongngo0320/fotoverse/network/members
[stars-shield]: https://img.shields.io/github/stars/phuongngo0320/fotoverse.svg?style=for-the-badge
[stars-url]: https://github.com/phuongngo0320/fotoverse/stargazers
[issues-shield]: https://img.shields.io/github/issues/phuongngo0320/fotoverse.svg?style=for-the-badge
[issues-url]: https://github.com/phuongngo0320/fotoverse/issues
[license-shield]: https://img.shields.io/github/license/phuongngo0320/fotoverse.svg?style=for-the-badge
[license-url]: https://github.com/phuongngo0320/fotoverse/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com  -->
