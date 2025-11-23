campApp
tech stack
ejs, node.js, express, mongoose and mongoDB



### Bootstrap Form Validation Setup

This application enables client-side validation using Bootstrap's custom styles.

To ensure this custom validation functions correctly, two important settings are applied to the forms:

1.  **Disabling Browser's Default Validation:**
    The **`novalidate`** attribute is added to the `<form>` tag of all verifiable forms. This disables the default HTML5 tooltip display and behavior.
2.  **Enabling Bootstrap Custom Validation:**
    The **`validated-form`** class is added to the `<form>` tag. This allows the custom JavaScript in the layout file (`boilerplate.ejs`) to recognize and process the form for validation.