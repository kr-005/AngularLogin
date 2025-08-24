pipeline {
  agent any

  tools { nodejs 'node20' } // Manage Jenkins → Tools → NodeJS installations

  options {
    timestamps()
  }

  environment {
    CI = 'true'
    NG_CLI_ANALYTICS = 'ci'
    NODE_OPTIONS = '--max_old_space_size=4096'
    APP_DIR = '.' // change to 'frontend' if your app is in a subfolder
  }

  stages {
     steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/master']],                     // branch
          gitTool: 'Default',                                 // Jenkies option
          userRemoteConfigs: [[
            url: 'https://github.com/kr-005/AngularLogin.git', //git repo path
            credentialsId: 'CoreTest'                         // Git Credential save in Jenkies Name
          ]]
        ])
      }

    stage('Install deps') {
      steps {
        dir("${APP_DIR}") {
          bat 'npm ci'
        }
      }
    }

    stage('Lint') {
      steps {
        dir("${APP_DIR}") {
          bat 'npm run lint --if-present'
        }
      }
    }

    // Optional: requires Chrome if you actually run Karma tests
    stage('Unit Tests (optional)') {
      when { expression { fileExists("${APP_DIR}/karma.conf.js") } }
      steps {
        dir("${APP_DIR}") {
          // Run tests once, headless
          bat 'npx ng test --watch=false --browsers=ChromeHeadless --code-coverage || true'
        }
      }
    }

    stage('Build (prod)') {
      steps {
        dir("${APP_DIR}") {
          bat 'npm run build'
        }
      }
    }
  }

  post {
    success {
        emailext(
            subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Jenkies Angular Build completed successfully. Check console output at ${env.BUILD_URL}",
            to: "kr018340@gmail.com"
        )
    }
    failure {
        emailext(
            subject: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "Jenkies Angular Build failed.",
            to: "kr018340@gmail.com"
        )
    }
  }
}
