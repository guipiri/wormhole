# Wormhole

This Electron desktop application aims to create expiring links (7 days) to easily share files.

## Prerequisites

1. A Windows or a Linux machine
2. A free tier [Cloudflare](https://www.cloudflare.com/) account

## Instalation

1. Download the Windows (.exe) or Linux (.deb) installer file in [Realeases](https://github.com/guipiri/wormhole/releases)
2. Install: click and execute the .exe file on Windows machines OR execute this command in a Linux terminal:

    ```bash
    sudo dpkg -i wormhole_1.0.0_amd64.deb
    ```

3. Now you have the Wormhole app installed in your machine. Let's **configure your Cloudflare bucket**, where your files will be stored for 7 days

## Configuration

1. Create a free tier [Cloudflare](https://www.cloudflare.com/) account choosing 'Add a website or a application' option
2. Click R2 in the left side menu, verify your e-mail and add the payment and address information (You will only be charged if you exceed the 10GB storage monthly limit)
3. Still in section R2, create a standard bucket
4. In the bucket configurations:
     - Go to Bucket Details and save the S3 API endpoit in the Wormhole configuration
     - Go to Public Access, allow access from R2.dev subdomain and save the Public R2.dev Bucket URL in the Wormhole configuration
     - Go to Object lifecycle rules and set the rule 'Delete uploaded objects after: 7 days'. This will help you to not be charged due to exceed the storage limit
  
5. In the R2 overview, click 'Manage R2 API Tokens' and create a token with 'Object Read & Write' permissions
6. Save the Access Key ID and the Secret Access Key in the Wormhole confirgurations
7. Now you can easily share you files!

## Usage

You can simply drag and drop files into the upload area or click there to open the file browser and choose one or more files to share. Click 'Enviar' and the shareable link will be available right below.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/your-feature-name)
3. Make your changes and commit them (git commit -m 'Add new feature')
4. Push to the branch (git push origin feature/your-feature-name)
5. Open a Pull Request

## Acknowledgements

We would like to thank the following open-source projects and libraries that made this project possible:

- Electron & Electron Forge
- React.js
- Node.js
- Typescript
- @aws-sdk/client-s3
- Webpack
- Tailwind CSS

# Contact

For any questions or inquiries, please contact:

Email: gui.soliveiras@gmail.com
