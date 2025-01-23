package controllers

import (
	"backend/config"
	"backend/models"
	"encoding/json"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	var pengguna models.Pengguna
	json.NewDecoder(r.Body).Decode(&pengguna)

	// Gunakan GORM untuk menyimpan data
	if err := config.DB.Create(&pengguna).Error; err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var pengguna models.Pengguna
	json.NewDecoder(r.Body).Decode(&pengguna)

	var user models.Pengguna
	// Gunakan GORM untuk query data
	err := config.DB.Where("username = ? AND password = ?", pengguna.Username, pengguna.Password).First(&user).Error
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}
