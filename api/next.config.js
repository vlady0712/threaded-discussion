// /api/comment/:uid GET && PUT && DELETE
// /api/comment GET && POST
// /api/thread POST
// /api/user POST

module.exports = {
    async redirects() {
        return [
          {
            source: '/api/I-dont-like-Bryan/1',
            destination: '/api/like-comment',
          },
          {
            source: '/api/I-dont-like-Bryan/2',
            destination: '/api/get-comment',
          },
          {
            source: '/api/I-dont-like-Bryan/3',
            destination: '/api/delete-comment',
          },
          {
            source: '/api/I-dont-like-Bryan/4',
            destination: '/api/submit-comment',
          },
          {
            source: '/api/I-dont-like-Bryan/5',
            destination: '/api/edit-comment',
          },
        ]
      },
}