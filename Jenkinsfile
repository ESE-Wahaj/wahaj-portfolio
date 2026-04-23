node {
    def appDir = '/var/www/nextjs-app'

    withEnv([
        'NEXT_PUBLIC_SUPABASE_URL=https://gcwshxlqqlbrdycstgru.supabase.co',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjd3NoeGxxcWxicmR5Y3N0Z3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1ODk0MDUsImV4cCI6MjA5MDE2NTQwNX0.ZnwVQoVFCSp0YkKnvOWE-t6h99JFwpyzpkMi6wzsbe0'
    ])

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
        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            rsync -av --delete --exclude='.git' --exclude='node_modules' ./ ${appDir}

            cd ${appDir}
            sudo npm install
            sudo npm run build
            sudo fuser -k 3000/tcp || true
            npm run start
        """
    }
}