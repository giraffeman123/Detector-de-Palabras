# plumber.R

#' @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#' Echo the parameter that was sent in
#' @param msg The message to echo back.
#' @get /echo
function(msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}

#' Verificación de audio 
#' @param audio
#' @get /check-audio 
function(audio){ 
  # TODO: Stream the data into the response rather than loading it all in memory 
  # first. 
  cat("---- New Request ----\n")
  library("tuneR")
  library("seewave")
  library("e1071")
  library("randomForest")
  library("caret")
  # Create a temporary example WAV file 
  audio = readWave("C:/Users/Elliot/Downloads/audio.wav")

  vaudio = audio/2^(audio@bit-1);
  duracion = duration(vaudio);
  audio_sesgo = skewness(vaudio@left);
  audio_curtosis = kurtosis(vaudio@left);
  audio_complejidad = ACI(vaudio);
  audio_crucero = zcr(vaudio);
  cruce_cero = table(audio_crucero)[[1]];
  
  audio_entropia = H(vaudio);
  promedio = mean(vaudio@left);
  mediana = length(vaudio@left)/2;
  varianza = var(vaudio@left);
  desviacion = sd(vaudio@left);

  #variable temporal para guardar datos
  nuevo=data.frame(duracionaudio=c(duracion),sesgo=c(audio_sesgo),curtosis=c(audio_curtosis),complejidad=c(audio_complejidad),cruce=c(cruce_cero),entropia=c(audio_entropia),media=c(promedio),mediana=c(vaudio@left[mediana]),desviacion=c(desviacion))
  
  audios <- read.csv("C:/Users/Elliot/Documents/Universidad/7mo Semestre/Mineria de Datos/Proyecto/audiosNor.csv")
  
  #generando el modelo con maquinas de soporte vectorial
  #con datos normalizados 
  modelo=svm(clase~.,data=audios,kernel="polynomial")
  prediccion=predict(modelo,nuevo)
  #modelNor=table(prediccionNor,datoNor$clase)
  #resNor=confusionMatrix(table(prediccionNor,datoNor$clase))
  
  cat(prediccion)
  list(prediccion)  
}

#' @post /upload
upload <- function(req, res){
  cat("---- New Request ----\n")
  # the path where you want to write the uploaded files
  file_path <- "C:/Users/Elliot/Desktop/"
  
  # strip the filename out of the postBody
  file_name <- gsub('\"', "", substr(req$postBody[2], 55, 1000))
  # need the length of the postBody so we know how much to write out
  file_length <- length(req$postBody)-1
  # first five lines of the post body contain metadata so are ignored
  file_content <- req$postBody[5:file_length]
  # build the path of the file to write
  file_to_write <- paste0(file_path, file_name)
  # write file out with no other checks at this time
  write(file_content, file = file_to_write)
  # print logging info to console
  cat("File", file_to_write, "uploaded\n")
  # return file path &name to user
  #return(file_to_write)
}
