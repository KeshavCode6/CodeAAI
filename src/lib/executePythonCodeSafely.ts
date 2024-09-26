import Docker from 'dockerode';
import crypto from 'crypto';

function generateRandomContainerName() {
  return `container-${crypto.randomBytes(4).toString('hex')}`;
}

const docker = new Docker();

export default async function executePythonCodeSafely(pythonCode : string) {

  const dockerContainerConfig = {
    Image: 'python:3.9',
    Cmd: ['python3', '-c', pythonCode],
    name: generateRandomContainerName(),
  };

  const dockerContainer = await docker.createContainer(dockerContainerConfig);
  await dockerContainer.start();

  await dockerContainer.wait();

  const dockerContainerLogs = await dockerContainer.logs({ stdout: true, stderr: true });
  const dockerContainerOutput = dockerContainerLogs.toString('utf-8');

  await dockerContainer.remove();

  return dockerContainerOutput;

}