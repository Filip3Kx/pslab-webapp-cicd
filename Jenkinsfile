pipeline {
    agent any
    environment {
        python_image="filip3k/python-jenkins-agent:latest"
        node_image="filip3k/nodejs-jenkins-agent:latest"
        git_repo="https://github.com/Filip3Kx/pslab-webapp-cicd"
        git_branch="dev"
    }
    stages{
        stage("Frontend Build & Test") {
            agent {
                docker { 
                    image "${node_image}"
                    args '-u root:root -e PATH="/var/lib/jenkins/jobs/test/workspace/frontend/node_modules/.bin:${PATH}" -w /var/lib/jenkins/jobs/test/workspace'
                    reuseNode true
                }
            }
            stages{
                stage("Git checkout") {
                    steps {
                        git branch: "${git_branch}", url: "${git_repo}"
                    }
                }
                stage("Build") {
                    steps {
                        dir("frontend") {
                            sh 'npm install'
                            sh 'ember build'
                        }
                    }
                }
                stage("Test") {
                    steps {
                        dir('frontend') {
                            sh 'eslint "app/**/*.js"'
                        }
                    }
                }
            }
        }
        stage("API Build & Testing") {
            agent {
                docker { 
                    image "${python_image}"
                    args '-u root:root'
                    reuseNode true
                }
            }
            stages {
                stage("Build") {
                    steps {
                        sh "apk add --no-cache postgresql-libs && apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev"
                        sh "pip install --upgrade pip"
                        sh "pip install -r requirements.txt"
                    }
                }
                stage("Test") {
                    steps {
                        script {
                            try {
                                sh "pip install flake8"
                                sh "flake8 --exclude=venv"
                            } catch (Exception e) {
                                currentBuild.result = 'SUCCESS'
                                echo "Linting errors detected, but continuing the build..."
                            }
                        }
                    }
                }
            }
        }
        stage("Build and publish Docker images") {
            steps {
                script {
                    sh "echo tobedone"
                    def project_id = "YOUR_GCP_PROJECT_ID"
                    def registry = "gcr.io"
                    def python_image_name = "pslab_api"
                    def node_image_name = "pslab_frontend"

                    // Authenticate Docker to GCP Container Registry
                    sh "gcloud auth configure-docker ${registry}"

                    // Build the Docker image
                    dir('frontend') {
                        sh "docker build -t ${registry}/${project_id}/${node_image_name} ."
                        sh "docker push ${registry}/${project_id}/${node_image_name}:${BUILD_ID}"
                        sh "docker push ${registry}/${project_id}/${node_image_name}:latest"
                    }
                    sh "docker build -t ${registry}/${project_id}/${python_image_name}:${BUILD_ID} ."
                    sh "docker push ${registry}/${project_id}/${python_image_name}:${BUILD_ID}"
                    sh "docker push ${registry}/${project_id}/${python_image_name}:latest"
                }
            }
        }
    }
}
