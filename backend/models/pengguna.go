package models

type Pengguna struct {
	ID       int    `gorm:"primaryKey" json:"id"`
	Username string `gorm:"unique" json:"username"`
	Password string `json:"password"`
}

// Tentukan nama tabel secara eksplisit
func (Pengguna) TableName() string {
	return "pengguna" // Sesuai dengan nama tabel di database
}
