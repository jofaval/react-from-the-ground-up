// HTML content can directly embeded into a JavaScript file
const htmlContent = <h1>It doesn't break!</h1>;

// We can pass normal JavaScript functions, directly, without direct event-binding
const onClick = () => {
    console.log('User clicked!!');
};
// key-value is a must, but it's implied with the shorthard
const button = <button onClick></button>;

// We can directly specify the key-value
const source = 'https://example.com';
const img = <img src={source} />;