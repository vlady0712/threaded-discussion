/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 */
export default function handler(request, response) {
    // the thread ID should be set as the hash of the page URL
    // the response should include permissions for the thread as chmod (AGE:admin,group,everyone)
    /*
        0: (000) No permission.
        1: (001) Execute permission.
        2: (010) Write permission.
        3: (011) Write and execute permissions.
        4: (100) Read permission.
        5: (101) Read and execute permissions.
        6: (110) Read and write permissions.
        7: (111) Read, write, and execute permissions.
    */
    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
}