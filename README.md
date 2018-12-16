# Hybrid Example
Examples explaining the use of Dat inside of middleware in an Express API.

## Install
```
git clone https://github.com/matthewstewart/hybrid-example.git
cd hybrid-example
mkdir dats
npm install
```

## [Example 1](https://github.com/matthewstewart/hybrid-example/blob/master/example1.js)
An example of writing and chaining middleware in an Express application.
```
node example1
```

## [Example 2](https://github.com/matthewstewart/hybrid-example/blob/master/example2.js)
An example of using the node file system module within middleware.
```
node example2
```

## [Example 3](https://github.com/matthewstewart/hybrid-example/blob/master/example3.js)
An example within Express middleware of:  
- Mock JSON form data for a Lab record that has yet to be published via Dat  
- Creation of the Dat  
- Updating Record With Dat Key  
- Updating of hypercored feeds file with Dat key, persisting the Dat  
- Returning the result in JSON API response
```
node example3
```