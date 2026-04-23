node {
    def appDir = '/var/www/nextjs-app'

    stage('Clean Workspace'){
        echo 'Cleaning Jenkins Workspace'
        deleteDir()
    }

    stage('Clone Repo'){
        echo 'Cloning the repo'
        git(
            branch: 'master',
            url: 'https://github.com/ESE-Wahaj/wahaj-portfolio'
        )
    }

    stage('Deploy to EC2'){
        echo 'Deploying to EC2'

        withEnv([
            'NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co',
            'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key'
        ]) {

            sh """
                sudo mkdir -p ${appDir}
                sudo chown -R jenkins:jenkins ${appDir}

                rsync -av --delete --exclude='.git' --exclude='node_modules' ./ ${appDir}

                cd ${appDir}

                echo "Checking env vars..."
                env | grep SUPABASE

                sudo npm install
                sudo npm run build

                sudo fuser -k 3000/tcp || true
                npm run start
            """
        }
    }
}