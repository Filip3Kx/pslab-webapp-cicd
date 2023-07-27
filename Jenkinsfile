pipeline {
    environment {
        git_repo=
        git_branch=
        node_image="node:8.1"
        python_image="python:3.6.1"
    }
    stages{
        stage("Frontend Build & Test") {
            agent {
                docker "${node_image}"
            }
            stages {
                stage("Fetch files") {
                    git branch: "${git_branch}" url: "${git_repo}"
                }
                stage("Build") {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm install phantomjs'
                            sh 'export PATH="/app/node_modules/.bin:${PATH}"'
                        }
                    }
                }
                stage("Test") {
                    steps {
                        dir('frontend') {
                            sh 'ember test'
                        }
                    }
                }
            }
        }
        stage("Backend API Build & Test") {
            agent {
                docker "${python_image}"
            }
            stages{
                stage("Fetch files") {
                    git branch: "${git_branch}" url: "${git_repo}"
                }
                stage("Build") {
                    steps {
                        sh 'pip install --upgrade pip'
                        sh 'pip install virtualenv'
                        sh 'virtualenv venv'
                        sh 'pip install -r requirements.txt'
                    }
                }
                stage("Test") {
                    steps {
                        sh 'pip install flake8'
                        sh 'flake8 --exclude=venv'
                    }
                }
            }
        }
        stage("Build and publish docker images") {
            stages {
                stage("Frontend") {
                    steps {
                        //tobedone
                    }
                }
                stage("API image") {
                    steps {
                        //tobedone
                    }
                }
            }
        }
    }
}