# Virufy PWA

## Translations

Translations files are located in `src/locales` folder.
For each language there is a file with the `json` extension. The name matches the *ISO 639-1* [language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for the language being translated.

To translate a line of text, open the corresponding language file and search for the text to be replaced. 
In order to keep these files clean, translation groups are separated by the screen they appear in.
When translating make sure the text is surrounded by double quotes.

    "selectCountry":  "Selecciona país",

If you need to use double quotes inside the text follow this example (add backslash before them):

    "paragraph2":  "\"Collection of Smartphone Data for Screening of COVID-19\"",

## Consent forms

### Adding a consent form for a new country 

To add a new country go over this steps:

 1. Go to `src/data/country.ts` and add a new line following this example that shows how to add United States: 

<pre>
export const countryData = [
  { name: 'Argentina', val: 'Argentina'},
  { name: 'Brazil', val: 'Brazil' },
  { name: 'Colombia', val: 'Colombia' },
  { name: 'Peru', val: 'Peru' },
  { name: 'United States', val: 'UnitedStates' }
];
</pre>

The bold text represents the new line added.
	
The `name` field is the text that the end user will see in the application.
This will appear in `COVID-19 Data Collection Form`	screen dropdown and will be selectable.
Note that the name of the country in the `val`  field can't have any spaces between words and they all must start with an upper-case letter. 

 2. Go to `public -> static -> consent` folder and create a new folder inside for the added country. The name of the folder must match exactly what was entered in the `val` field in the previous step.
 
 3. Inside the newly created folder add the consent file as an HTML document. The language of this document must be the default for the country (it may be the main spoken language). For example, english for the United States.
Steps to convert a Microsoft Word document to an HTML file are detailed in the next section. 

	The name of the file must be `default.html`

4. Deploy the application as instructed in the build and deploy section.

**NOTE**: If the user selects a language that doesn't have an associated consent form in the folder named as the country, the `default.html` file content will be presented. In order to prevent this, add a new language as detailed in next section.

### Adding a new consent form for an existing country

To add a new consent form for a country that was already created and has its `default.html` consent, the following steps are to be followed:

 1. Go to `src/data/lang.ts` and add a line following this example

<pre>
export const languageData = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' }
];
</pre>

The bold text represents the new line added. It will add french as a new language.

The `code` fields represents the *ISO 639-1* [language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and the `label` field represents the text to be displayed to the user in the dropdown to select languages in the `COVID-19 Data Collection Form` screen.

 2. Export the consent form as an HTML document as detailed in the next section. It should be named exactly like the language **code** entered in the previous step. For example, to add french, a resulting file would be `fr.html`.
 
 3. Add the document to the corresponding folder of the country that is to have a new consent. For example, if adding french to United States, the file should be placed in `src/public/static/consent/UnitedStates` folder along with the `default.html` that has to be created before as detailed in the previous section.

### Exporting Microsoft Word document to HTML file

Consent forms need to be `HTML` files. If they are exported from a `.doc` extension (Microsoft Word) they need to be exported with `UTF-8` encoding. The required steps to save a Word document as an HTML file are:

>  1. Go to File -> Export
>  2. Click "Change Type"
>  3. Select "Save as another type"
>  4. In the following "Save as" window, select "Web Page" from the "Save as type" dropdown.
>  5. Click "Tools" -> "Save options..."
>  6. In the "Encoding" tab, select "Unicode(UTF-8)".
>  7. Accept and save the file

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
