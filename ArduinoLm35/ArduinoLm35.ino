int analog_pin = 0;
float temperatura;
int temp;
void setup () {
  Serial.begin(9600);
  pinMode(2,OUTPUT);
   pinMode(3,OUTPUT);
}
float readSensorLM(){
 
  temp = analogRead(analog_pin);
  //Serial.print("\nR");
  //Serial.print(temp);
  temp = 5.0*temp*100.0/1024.0;
  //Serial.print("\n°C");
  Serial.print(temp);
  return temp;
}
void loop() {
  
  temperatura= readSensorLM();
 
  digitalWrite(3,LOW);
  if(temperatura<=40){
    digitalWrite(2,HIGH);
    delay(100);
    }
    
    if(temperatura>40){
      digitalWrite(3,HIGH);
     while(temperatura>35){
      digitalWrite(2,LOW);
      
      temperatura=readSensorLM();
        delay(1000);
     }
    //delay(100);
    }
    
  delay(1000);
}
