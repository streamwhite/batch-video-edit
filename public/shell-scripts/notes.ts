export const content = {
  nonDeveloper: {
    setup: {
      windows: [
        'download the powershell script from https://github.com/streamwhite/batch-video-edit/tree/main/public/shell-scripts/set-up-and-running',
        'run the powershell script with admin privilege',
        'run command `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser`',
        'locate the folder where the script is downloaded',
        'run the script with the command `./windows_powershell_setup_and_run.ps1`',
      ],
      'debian-ubuntu': [
        'download the shell script from https://github.com/streamwhite/batch-video-edit/tree/main/public/shell-scripts/set-up-and-running',
        'locate the folder where the script is downloaded',
        'change the permission of the script with the command `chmod +x debian_ubuntu_setup_and_run.sh`',
      ],
      mac: '',
    },
    run: {
      windows: '',
      linux: '',
      mac: '',
    },
    update: {
      windows: '',
      linux: '',
      mac: '',
    },
  },
  developer: {
    setup: {
      windows: '',
      'debian-ubuntu': '',
      mac: '',
    },
    run: {
      windows: '',
      'debian-ubuntu': '',
      mac: '',
    },
    update: {
      windows: '',
      linux: '',
      mac: '',
    },
  },
  help: ['提出请求GitHub issue'],
};
