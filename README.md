# adapt-list

**List** is a *presentation component* which displays text in a list. Text can be in an ordered, or unordered, list with or without an image.

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**\_component** (string): This value must be: `text`.

**\_classes** (string): CSS class name to be applied to **List**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space. Supported classes are `"align-items-vert-center"` which aligns either the step number or image centrally, on the vertical axis, with the content.

**\_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

**\_items** (string): Multiple items may be created. Each item represents one list item for this component and contains values for **title**, **body**, **\_imageSrc_** and **alt**.

>**title** (string): This is the title text for the list item.

>**body** (string): This is the main body text for the list item.

>**\_imageSrc_** (string):  File name (including path) of the image. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-two.jpg*).

>**alt** (string): This text becomes the image’s `alt` attribute.

## Limitations

No known limitations.

----------------------------
**Version number:**  3.0.1  
**Framework versions:** 5+  
**Author / maintainer:** Kineo  
**Accessibility support:** WAI AA  
**RTL support:** Yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 12+13 for macOS/iOS/iPadOS, Opera  
