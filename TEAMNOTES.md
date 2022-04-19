# Team Notes:
This is for maintaining communication for da-pengiuns disucssion thread project.

## Meeting Notes:
These are notes to be maintained PER date that you meet. What you did and what the next steps are.
### Meeting Date
In Class **03-17-2022**: Discuss choices for discussion thread project for the check- in 1.

#### What we did:


#### What we'll do next:


## Status check ins
These are dedicated status check-ins as this is a multi-week project.

### Check-in 1
Visual Changes

1. Add post more visible
2. Padding
3. Visuals-- make everything pretty
4. Seed Propic?
5. Edit/delete/reply
6. Call BE to get comments

Backend Changes
1. Delete post-main-- content unavliable/replys stay
2. Delete reply== gone from the post-main
3. Update schema
4. Update demo
5. Local Storage-- demo
6. post-main-- UUID
7. comments-- UUID
8. Get all comments

Schema: [See DBDiagram ER diagram for relational database schema](https://dbdiagram.io/d/623369b20ac038740c529b9c) ![Diagram Image](https://i.imgur.com/mFoLAaT.png)

### Check-in 2 ###

#### User Flow Diagrams: ####
_Reply Workflow:_

![Reply-userflow-diagram](https://user-images.githubusercontent.com/48635853/160300745-cb69a590-b35b-4a5f-abbd-390a0f993d2f.png)
    
_Comment Workflow:_

![Comment-workflow-diagram](https://user-images.githubusercontent.com/48635853/160300983-77c89afa-554d-4e28-8648-06e6f9034c39.png)

**_The above diagrams have also been added to the 11ty docs, which can be viewed under the [Notes post](https://da-penguins.github.io/threaded-discussion-docs/posts/notes/)._**

### Check-in 3 ###'

- Documentation of each end point
https://da-penguins.stoplight.io/studio/threaded-discussion?source=b5xrzjkw&symbol=%252Fp%252Freference%252Fapi.yaml%252Fpaths%252F%7E1get-comment%252Fget

- Added backend logic for 4 CRUD related operations for each comment
  - Create `/submit-comment`
  - Read `/get-comment`
  - Update `/edit-comment`
  - Delete `/delete-comment`
- Added Additional 'Like Comment' backend API logic `/like-comment`
- Created `/auth` API for future implementation of JWT authentication on each API endpoint

### Check-in 4 ###
- 11ty documentation of team updates: https://da-penguins.github.io/threaded-discussion-docs/posts/notes/
- Significant updates to user interface
- Implemented user authentication and session validation via `/auth` endpoint
- Tie user credential checks into other API endpoints
- API Documentation is complete and available **_[here](https://da-penguins.stoplight.io/studio/threaded-discussion?source=b5xrzjkw&symbol=%252Fp%252Freference%252Fapi.yaml%252Fpaths%252F%7E1get-comment%252Fget)_**
- User flows have been updated, with User Authentication being the only flow that has not been documented ![image](https://user-images.githubusercontent.com/48635853/162653524-4ec45952-4179-4e2a-ae18-76ca32507c16.png)


### Check-in 5 ###
- What's done:
  - Backend:
    - Database is fully set up and persists data 
    - CRUD functionality and all API endpoints setup
    - Support for multiple threads and pervasive data storage
    - Comments have been set up to return chronologically based on most recent
  - Frontend:
    - Sign-in page with what's your name input
    - General design for comment structure and threaded-discussion tag have been created
    - Buttons that facilitate API calls for CRUD functionality on comment data
  - API/Documentation:
    - OpenAPI documentation has been published
    - Workflow diagrams for all API endpoints
    - 11ty Documentation site is up to date
- What's left:
  - Backend:
    - Error handling with JWT generation and user authentication
    - Cleaning API returns for easier translation to frontend
    - Verifying that domain validation is completely functional
  - Frontend:
    - Visually present all comments on page 
    - Create visual representation for replies
    - Finish main comment structure (working through implementation of icons and content display)
    - Verify that UUID management is working properly
  - API/Documentation: 
    - Keep 11ty documenation up to date
    - Update Auth endpoint workflow based on backend's final decisions with JWT Auth
- Questions:
  - Having trouble conceptualizing management of different threads on frontend (not visually but in the code), any advice/recommendation is welcome!
  - Async calls to API end up showing empty comments that just have a "promise" object to start. Other than going synchronous, is there any way to stop the comment HTML from generating until the comment data is fetched? (e.g. a timeout or something similar?)
