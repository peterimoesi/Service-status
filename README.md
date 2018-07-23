# Simple react-redux single page app
+ Created the react-redux environment
+
+ Created table framework for status pages (pages.js) - Table framework containing the column name and respective column span - This way new status pages can be added to pages.js irrespective of number of columns
+ I called Datadog Api to get list of services and filtered the array for the required service of interest - Event pipeline and Alerting engine
+ 
+ I called Azure api to get xml data and with xml-js library, I converted it to JSON object - I made a default Azure object containing Virtual machines and Cloud service keys with "operational" values - My objective is that if xml data reports faults relating to cloud services and virtual machines, I update the default Azure object. - This objective was not completed because I was not able to get any faults relating to these services properly parse the xml to the needed json object
+ Added component for creating new services for status pages - Component contains new service button to toggle the form or not - Form contains the service name and other fields required by the status page - On save, updated the redux date with the form data

+ Libraries used (available in package.json)
React,
•	 React redux,
•	Redux,
•	Redux thunk
•	Axios
•	Eslint
•	Other libraries are
o	React-time-ago for getting time from last refresh
o	Redux-devtools for redux debugging
o	shortId for unique id characters
o	xml-js for converting xml data to json object
		
	
	
	
	
