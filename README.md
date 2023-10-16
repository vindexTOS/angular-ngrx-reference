 

**Optio Banner Management System**

This project was my first experience with Angular, and it involved the development of a banner management system for the banking sector and related industries. The system was designed to streamline communication between banks and their clients through mobile and internet banking platforms.

## Technologies Used

- **Angular**: This project was implemented using Angular, marking my first venture into this front-end framework.
- **Ngrx**: For state management, I utilized Ngrx to effectively manage the application's state.
- **Angular Material**: I employed Angular Material for UI components, making the user interface visually appealing and user-friendly.

## Challenge

The banking sector often faces unique challenges, including the need for efficient communication and the management of various functions within a single platform. This project aimed to address these challenges by creating a dynamic banner management module. This module serves as a valuable tool for marketing teams within banks, enabling them to create, manage, and distribute banners seamlessly across various digital platforms.

## Technical Overview

To facilitate banner management and distribution, the user interface was divided into logical sections such as Header, Right Sidebar, Footer, Main Hero Slider, and others. When adding banners, one of these sections had to be specified for placement.

The essential fields for banner creation, including Title, Channel, Language, Zone, Priority, File ID, URL, Start Date, End Date, and Active (allowing quick toggling of banner display), are clearly defined.

## Banner Listing Page

I created a listing page to display the banners using data retrieved from the Optio Banners API. This page allows users to view banner information, including the image, title, status, zone, start and end dates, and labels. Users can also apply filtering and sorting to the banner list and search for specific banners using text.

## Banner Editing Form

For adding and editing banners, I designed a form that appears as a drawer on the right side of the screen. This form allows users to quickly make changes to a banner's details. It also supports image uploads, title entry, zone selection, status assignment, date selection, and label tagging. Image uploads are processed using the Optio Blobs API.

The form includes dropdowns for selecting zones and labels, with possible values loaded from the Optio Reference Data API.

## Optio Banners API

This project interacts with the Optio Banners API using CRUD operations, which are as follows:

- **Find**: To search for multiple banner records.
- **Find-One**: To retrieve a single banner record.
- **Save**: To create or update a banner record.
- **Delete**: To remove a banner record.

The API endpoints are clearly documented for reference and usage.

This project allowed me to gain hands-on experience with Angular, Ngrx, and Angular Material while addressing a real-world challenge faced by the banking sector. It was a valuable learning opportunity that honed my skills in front-end development.

