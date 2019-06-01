install.packages("plumber")
install.packages("devtools")
devtools::install_github("trestletech/plumber")
library(plumber)

pr <- plumb("C:/Users/Elliot/Documents/Universidad/7mo Semestre/Mineria de Datos/Proyecto/plumber.R")
pr$run()
