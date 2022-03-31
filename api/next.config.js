module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/like-comment',
            destination: '/api/discussions/comment/like',
          },
        ]
      },
}