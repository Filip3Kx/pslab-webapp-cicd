pipeline {
    agent any
    environment {
        main_workspace_path="/var/lib/jenkins/workspace/pslab-pipeline"
        python_image="filip3k/python-jenkins-agent:latest"
        node_image="filip3k/nodejs-jenkins-agent:latest"
        git_repo="https://github.com/Filip3Kx/pslab-webapp-cicd"
        git_branch="dev"
        node_modules_path='PATH="/var/lib/jenkins/workspace/pslab-pipeline/frontend/node_modules/.bin:${PATH}"'
        project_id = ""
        registry = "gcr.io"
        python_image_name = "pslab_api"
        node_image_name = "pslab_frontend"
    }
    stages{
        stage("Frontend Build & Test") {
            agent {
                docker { 
                    image "${node_image}"
                    args "-u root:root -e ${node_modules_path}"
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
            agent {
                node {
                    label 'main'
                }
            }
            steps {
                steps {
                    //don't know how to prevent the other node from creating "workspace@2" instead of working on the same one so just using a variable
                    dir("${main_workspace_path}") {
                        sh "docker build -t ${python_image_name} ."
        
                        sh "docker tag ${python_image_name} ${registry}/${project_id}/${python_image_name}:${BUILD_ID}"
                        sh "docker push ${registry}/${project_id}/${python_image_name}:${BUILD_ID}"
        
                        sh "docker tag ${python_image_name} ${registry}/${project_id}/${python_image_name}:latest"
                        sh "docker push ${registry}/${project_id}/${python_image_name}:latest"
                    }
                    dir("${main_workspace_path}/frontend") {
                        sh "docker build -t ${node_image_name} ."

                        sh "docker tag ${node_image_name} ${registry}/${project_id}/${node_image_name}:${BUILD_ID}"
                        sh "docker push ${registry}/${project_id}/${node_image_name}:${BUILD_ID}"

                        sh "docker tag ${node_image_name} ${registry}/${project_id}/${node_image_name}:latest"
                        sh "docker push ${registry}/${project_id}/${node_image_name}:latest"
                    }
                }
            }
        }
    }
}
