# pslab-webapp-cicd

This repo's purpose is to train myself on CI/CD. This the original [repo](https://github.com/fossasia/pslab-webapp/tree/master) that i forked from. 

Had to change a few things because the dependencies of the original were very much outdated.

# CI/CD Pipeline

- After pushes onto repository a job is triggered
- Jenkins creates 2 Docker agents
  - [python-jenkins-agent](https://hub.docker.com/r/filip3k/python-jenkins-agent)
  - [nodejs-jenkins-agent](https://hub.docker.com/r/filip3k/nodejs-jenkins-agent)
- API and Frontend are built and tested
- Docker images are built from the Dockerfiles and pushed to GCP Container registry
- Repo contains a docker compose file for quick local setup
- The images are deployed to a cluster

![image](https://github.com/Filip3Kx/pslab-webapp-cicd/assets/114138650/00fbb028-ed43-4420-be0c-2ccc3d52ec41)

### Jenkins pipeline run
![image](https://github.com/Filip3Kx/pslab-webapp-cicd/assets/114138650/26c39a1b-8c3a-4882-b507-4d75bfb5d7a0)

### Kubernetes deployment
![image](https://github.com/Filip3Kx/pslab-webapp-cicd/assets/114138650/4265b22e-0ea7-4496-a4b0-f5cf6e352e49)

