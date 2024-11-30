import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'si3213',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents (on, config) {
      // You can also access dynamic data here
      const articleId = config.env.ARTICLE_ID
      const userId = config.env.USER_ID
      console.log('Article ID:', articleId)
      console.log('User ID:', userId)
      return config
    },
    env: {
      ARTICLE_ID: '47504454-810e-4877-a3b4-3d94c377cf9a', // Set a default value if not defined
      USER_ID: '1804b13c-dd7f-4d19-ad43-93a3330307bd'
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    env: {
      ARTICLE_ID: '47504454-810e-4877-a3b4-3d94c377cf9a', // Set a default value if not defined
      USER_ID: '1804b13c-dd7f-4d19-ad43-93a3330307bd'
    }
  }
})
