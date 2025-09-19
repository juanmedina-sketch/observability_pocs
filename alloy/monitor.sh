#!/bin/bash

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

main() {
  case "${1:-help}" in
    start)
      echo -e "${BLUE}Starting monitor...${NC}"
      docker compose up -d
      echo -e "${GREEN}Monitor started successfully.${NC}"
      ;;
    stop)
      echo -e "${RED}Stopping monitor...${NC}"
      docker compose down
      echo -e "${GREEN}Monitor stopped.${NC}"
      ;;
    status)
      echo -e "${YELLOW}Checking monitor status...${NC}"
      docker compose ps
      ;;
    logs)
      echo -e "${YELLOW}Showing monitor logs... (Ctrl+C to exit)${NC}"
      docker compose logs -f
      ;;
    traffic)
      generate_test_traffic "${2:-30}"
      ;;
    *)
      echo -e "Usage: $0 {start|stop|status|logs}"
      exit 1
      ;;
  esac
}

generate_test_traffic() {
    local requests=${1:-30}
    echo -e "${BLUE}Generando $requests solicitudes de prueba a demo-echo...${NC}"
    
    # Verificar que la aplicación esté ejecutándose
    if ! curl -s http://localhost:8080/metrics > /dev/null; then
        echo -e "${RED}Error: La aplicación demo-echo no responde en http://localhost:8080${NC}"
        return 1
    fi
    
    echo "Enviando solicitudes..."
    for ((i=1; i<=requests; i++)); do
        # Alternar entre /success y /fail
        if (( i % 2 == 0 )); then
            curl -s http://localhost:8080/success > /dev/null
        else
            curl -s http://localhost:8080/fail > /dev/null
        fi

        # Mostrar progreso cada 10 requests
        if ((i % 10 == 0)); then
            echo -ne "\rProgreso: $i/$requests requests"
        fi
        
        sleep 0.2
    done
    echo ""
    echo -e "${GREEN}✓ $requests solicitudes enviadas a demo-echo (/success y /fail)${NC}"
}


main "$@"
