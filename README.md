Technologies Used
    Node.js & Express
    MongoDB & Mongoose
    EJS (Embedded JavaScript)
    Bootstrap 5 (CSS & JS)

### Bootstrap Form Validation Setup

This application enables client-side validation using Bootstrap's custom styles.

To ensure this custom validation functions correctly, three important settings are applied:

1.  **Disabling Browser's Default Validation:**
    The **`novalidate`** attribute is added to the `<form>` tag of all verifiable forms. This disables the default HTML5 tooltip display and behavior.
2.  **Enabling Bootstrap Custom Validation:**
    The **`validated-form`** class is added to the `<form>` tag. This allows the custom JavaScript to recognize and process the form for validation.
3.  **Custom JavaScript Implementation:**
    The following script, typically placed in the main layout file (`boilerplate.ejs`), executes the Bootstrap validation logic:

```javascript
// Located in boilerplate.ejs
<script>
(function () {
  'use strict';
  // Fetches forms with the designated class
  const forms = document.querySelectorAll('.validated-form');

  // Loop over them and prevent submission if invalid
  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      // Adds the class to display validation feedback
      form.classList.add('was-validated');
    }, false);
  });
})();
</script>
```
