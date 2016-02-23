# Multiple React Issue
Clone the repo, run:

    npm install

Run:

    npm run gulp

Check: localhost:8889

## What is supposed to happen
The console will show the error:

    Uncaught Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).

## How to fix it
Uncomment in the gulpfile:

    var files = {
      dependencies: [
        // 'react-addons-transition-group',
        'react',
        'react-dom'
      ],
      ...
    }