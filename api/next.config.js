module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/weather',
            destination: '/api/weather',
          },
        ]
      },
}