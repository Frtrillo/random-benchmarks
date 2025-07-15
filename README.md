# JWT Benchmark: Node.js/Bun vs Java

Este proyecto compara el rendimiento de generación y verificación de tokens JWT entre Node.js/Bun y Java.

## Descripción

El benchmark ejecuta múltiples iteraciones de:
1. Generación de un token JWT con claims (subject, issued at, expiration)
2. Verificación del token generado
3. Validación de que el subject coincide con el email original

Ambas implementaciones utilizan el mismo secreto JWT y la misma estructura de datos para garantizar una comparación justa.

## Estructura del Proyecto

```
random-benchmarks/
├── assets/
│   └── emails.json          # Lista de emails para testing
├── java/
│   ├── App.java            # Implementación en Java
│   └── com/mycompany/app/
├── lib/                    # Dependencias Java (JWT, Gson)
├── nodejs-or-bun/
│   └── jwt-bench.js        # Implementación en Node.js/Bun
└── run-benchmarks.sh       # Script para ejecutar benchmarks
```

## Resultados de Benchmark

Los resultados muestran el tiempo total en milisegundos para completar las iteraciones especificadas:

| Iteraciones | Node.js/Bun (ms) | Java (ms) | Ratio (Java/Node.js) |
|-------------|------------------|-----------|---------------------|
| 5,000       | 104             | 537       | 5.16x más lento     |
| 500,000     | 8,752           | 6,116     | 0.70x más rápido    |
| 5,000,000   | 97,501          | 51,770    | 0.53x más rápido    |

### Análisis de Resultados

- **Carga pequeña (5K iteraciones)**: Node.js/Bun es significativamente más rápido, posiblemente debido a la optimización de JIT y menor overhead de startup.

- **Carga media (500K iteraciones)**: Java comienza a mostrar mejor rendimiento, probablemente debido a la optimización del JVM.

- **Carga alta (5M iteraciones)**: Java es casi 2x más rápido que Node.js/Bun, demostrando la eficiencia del JVM para cargas de trabajo intensivas.

## Requisitos

### Node.js/Bun
- Bun runtime (recomendado) o Node.js
- Dependencias: `jsonwebtoken`

### Java
- Java 8 o superior
- Dependencias en `lib/`:
  - `jjwt-api.jar`
  - `jjwt-impl.jar`
  - `jjwt-jackson.jar`
  - `gson.jar`

## Uso

```bash
# Ejecutar con 10,000 iteraciones (por defecto)
./run-benchmarks.sh

# Ejecutar con iteraciones específicas
./run-benchmarks.sh 50000
```

## Implementaciones

### Node.js/Bun (`nodejs-or-bun/jwt-bench.js`)
- Utiliza la librería `jsonwebtoken`
- Lee emails desde `assets/emails.json`
- Genera y verifica tokens JWT en un bucle

### Java (`java/App.java`)
- Utiliza la librería `jjwt` (Java JWT)
- Usa `Gson` para parsing JSON
- Implementa la misma lógica que la versión Node.js

## Notas Técnicas

- Ambas implementaciones usan el mismo secreto JWT hardcodeado
- Los tokens incluyen claims: `sub` (subject), `iat` (issued at), `exp` (expiration)
- La expiración se establece a 2 horas desde la generación
- Se valida que el subject del token verificado coincida con el email original

## Conclusión

Para aplicaciones con cargas de trabajo intensivas de JWT, Java muestra mejor rendimiento a largo plazo, mientras que Node.js/Bun es más eficiente para cargas pequeñas y desarrollo rápido. 