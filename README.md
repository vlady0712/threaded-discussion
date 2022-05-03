# Threaded-Discussion

## Documentation:
- [OpenAPI Documentation](https://da-penguins.stoplight.io/docs/threaded-discussion/YXBpOjI4MTkzNA-threaded-discussion-api) 
- Project Documentation:
  - [GitHub](https://github.com/Da-Penguins/threaded-discussion-docs)
  - [Site](https://da-penguins.github.io/threaded-discussion-docs/)
- [threaded-discussion demo](http://threaded-discussion.vercel.app/)

### Goals

- Create a completely headless discussion widget that is able to save and recall the conversation
    
- Ability for user to embed in a page and it automatically generate a UUID if one is not supplied

- Use @lrnwebcomponents/threaded-discussion and it's data model requirement (or making a new one for each)

- Going for a "Disqus" / drop in and use anywhere style commenting engine. Your demo can have multiples on the same page / app in order to illustrate this capability (if it works with multiple UUIDs in the same page that would indicate that it's flexible to handle multiple conversations on different end points)

### Requirements for back end
- POST / CREATE Ask for a UUID to be created which creates a data storage area for this
- POST / CREATE Add a new comment to a thread
- POST / UPDATE edit a comment's content
- DELETE / DELETE delete a comment
- Ability to store multiple threads; one per UUID
- Pervasive data store in a jsonbin.io or actual data store of your choice
- Validation of the domain -> UUID -> route as a way of verifying this discussion can be embedded / loaded here

### Requirements for front end

- If no UUID on front end, needs to ask backend for one
- A simple "whats your name" input so that they can set their user name in localStorage on the front end
    - obviously in a production environment we'd be doing this via a larger system concept / JWT / something to validate. We're not handling that outright as this is a demo
- wiring up to the threaded-discussion tag and handling it's events to add new comments
    
- wiring up to a highly simplified / reddit style list view which then has reply, edit, and delete operations off to the side for easy testing and verification of it all working (again, obviously in a prod environment it wouldn't have this but demonstrates the flexibility of how to render and the headless nature of the calls to the backend working agnostic of UI)




## General Requirements
- Uses Vercel 
- OpenAPI 3.0 Document (Swagger)
- More than 1 microservice
- must store data in a data storage engine
- Has a Demo
- Invoking micro frontend by writing 1 tag
- Document project with 11ty Site

## 11ty Site Requirements
- Link to OpenAPI 3.0 Document
- links to background material on the project, lit, vercel, hax, etc
- links / short "Who made this" section to pump your SEO / give you something to point to
- Repo links, links to the original issue being solved
- Documentation on how the microservice works. What the API end points are. What is required to leverage them. How the code leverages them
- Visual documentation of the different states your micro frontend can be put in. Getting data, adding data, etc.
- This should fully explain to someone who doesn't know the stack or how it's built, what it does, how to get into the code, and learn more about the project and how to play with it 
