# Optio Banners Management System

Optio Banners Management System is an Angular application designed to help banks and their clients manage a crucial dialog in the banking sector. It provides a user-friendly interface for creating and managing banners for different digital platforms, including mobile and internet banking.

📅 Stage: Optio Internship / October 2023

## Features

- Create and manage banners for different communication channels in the banking sector.
- Angular application using Angular Material for a modern and user-friendly UI.
- Utilizes NgrX for state management to efficiently manage application data.

## Technical Overview

The system is divided into logical zones, including Header, Right Sidebar, Footer, Main Hero Slider, and more, to allow for the dynamic creation and management of banners. Each banner includes the following key fields:

- **id:** A unique identifier for the banner.
- **name:** The title of the banner.
- **channelId:** The communication channel for the banner.
- **language:** The language in which the banner is displayed.
- **zoneId:** The logical zone where the banner is shown.
- **priority:** An index used for sorting banners.
- **fileId:** The identifier of the uploaded banner image.
- **url:** The link that users will be directed to when they click on the banner.
- **startDate:** The date when the banner becomes active.
- **endDate:** The date when the banner should no longer be displayed.
- **active:** A boolean indicating whether the banner is currently active.
- **labels:** An array of labels to categorize the banner.

## Getting Started

To view a list of banners and edit them, you can access the Optio Banners API. The API provides CRUD operations, allowing you to find banners, view details, and make updates. To access the application's banner list, you can create a separate page that displays the data retrieved from the API, enabling users to filter and search for specific banners.

## Banner List Page

Create a page to display a list of banners using data from the Optio Banners API. This page should provide information about each banner, including the image, title, status, zone, start and end dates, and labels. You can implement features such as paging and sorting to make it easy for users to navigate through the banner list. Additionally, include a search feature to filter the list based on specific criteria.

## Banner Editing Form

For adding and editing banners, you can use a form that appears in a drawer or modal window when a user clicks on a banner in the list. This form should allow users to:

- Upload an image
- Set the title
- Choose the display zone
- Assign labels
- Set start and end dates
- And more

Images can be uploaded using Optio's Blobs API, and zones and labels can be retrieved via Optio's Reference Data API.

## API Documentation

For more detailed information about using the Banners API, please refer to the [API documentation](#). It provides methods for searching, viewing, creating, and updating banner data.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute or report issues on [GitHub](https://github.com/yourusername/optio-banners).

You should replace the placeholders (#, ##, and [...]) with your actual content and links to your API documentation. This is a basic template, and you can enhance it with more details, instructions, and any other information relevant to your project. Don't forget to update the license link as well.

Please make sure to replace [...] with actual links and information. Additionally, remember to update the LICENSE link to the correct license file in your repository.





