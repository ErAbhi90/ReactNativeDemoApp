```mermaid
graph TD
    A[Welcome Screen] 
    A -->R[Register]
    A -->L[Login]
    L -->|Request|C{Firebase Auth}
    C --> |Authentication Fail|L
    C -->|Successfull| B(News Screen)
    
```