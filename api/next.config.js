// /api/comment/:uid GET && PUT && DELETE
// /api/comment GET && POST
// /api/thread POST
// /api/user POST

module.exports = {
    async redirects() {
        return [
          {
            source: '/api/comment/:uid',
            has: [
              {
                type: "header",
                key: "operation",
                value: "like"
              }
            ],
            destination: '/api/like-comment',
          },
          {
            source: '/api/comment/:uid',
            has: [
              {
                type: "header",
                key: "operation",
                value: "get"
              }
            ],
            destination: '/api/get-comment',
          },
          {
            source: '/api/comment/:uid',
            has: [
              {
                type: "header",
                key: "operation",
                value: "delete"
              }
            ],
            destination: '/api/delete-comment',
          },
          {
            source: '/api/comment',
            destination: '/api/submit-comment',
          },
          {
            source: '/api/comment/:uid',
            has: [
              {
                type: "header",
                key: "operation",
                value: "edit"
              }
            ],
            destination: '/api/edit-comment',
          },
          {
            source: '/api/user',
            destination: '/api/create-user',
          },
        ]
      },
}