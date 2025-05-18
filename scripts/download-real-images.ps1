# Script PowerShell pour télécharger des images réelles pour TournoMaster
# Ce script utilise Invoke-WebRequest pour télécharger des images libres de droits 
# depuis Unsplash et autres sites gratuits

# Créer le répertoire images/real s'il n'existe pas
$imageDir = "C:\Users\ACHRAF\Desktop\tournament\esport\public\images\real"
if (-not (Test-Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force | Out-Null
    Write-Host "Dossier créé: $imageDir"
}

# Liste des images à télécharger (libres de droits)
$imagesToDownload = @(
    @{
        Name = "hero-background.jpg" 
        Url = "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&h=1080&auto=format&fit=crop"
        Description = "Arena e-sport - Image d'arrière-plan héroïque"
    },
    @{
        Name = "group-tournament.jpg" 
        Url = "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&h=600&auto=format&fit=crop"
        Description = "Tournoi de groupe - Équipe jouant ensemble"
    },
    @{
        Name = "bracket-tournament.jpg" 
        Url = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&h=600&auto=format&fit=crop"
        Description = "Tournoi à élimination directe - Bracket"
    },
    @{
        Name = "swiss-tournament.jpg" 
        Url = "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=800&h=600&auto=format&fit=crop"
        Description = "Tournoi suisse - Joueurs concentrés"
    },
    @{
        Name = "round-robin.jpg" 
        Url = "https://images.unsplash.com/photo-1551817958-d9d86fb29431?q=80&w=800&h=600&auto=format&fit=crop"
        Description = "Tournoi round-robin - Joueurs face-à-face"
    },
    @{
        Name = "profile-default-1.jpg" 
        Url = "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop"
        Description = "Photo de profil - Femme professionnelle"
    },
    @{
        Name = "profile-default-2.jpg" 
        Url = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop"
        Description = "Photo de profil - Homme professionnel"
    },
    @{
        Name = "profile-default-3.jpg" 
        Url = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=256&h=256&auto=format&fit=crop"
        Description = "Photo de profil - Femme professionnelle 2"
    },
    @{
        Name = "placeholder.jpg" 
        Url = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&h=300&auto=format&fit=crop"
        Description = "Image placeholder générique avec motif abstrait"
    }
)

# Télécharger chaque image
foreach ($image in $imagesToDownload) {
    $destinationPath = Join-Path -Path $imageDir -ChildPath $image.Name
    try {
        Write-Host "Téléchargement de $($image.Name) - $($image.Description)"
        Invoke-WebRequest -Uri $image.Url -OutFile $destinationPath
        Write-Host "Téléchargé: $($image.Name)" -ForegroundColor Green
    } catch {
        Write-Host "Erreur lors du téléchargement de $($image.Name): $_" -ForegroundColor Red
    }
}

Write-Host "Téléchargement des images terminé!" -ForegroundColor Green
