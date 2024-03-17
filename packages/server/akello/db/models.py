import datetime
import json
from typing import List, Optional
from akello.db.connector.dynamodb import RegistryDBBaseModel
from akello.db.types import Measurement, UserRole, FlagTypes, PatientStatysTypes, AkelloApp, TreatmentLog, EventLog, AuditLog

class UserModel(RegistryDBBaseModel):
    cognito_user_id: str
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    profile_picture: Optional[str] = None
    registries: List[str] = []

    @property
    def partition_key(self) -> str:
        return 'user:' + self.cognito_user_id

    @property
    def sort_key(self) -> str:
        return 'profile'


class UserSession(RegistryDBBaseModel):
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()
    user_agent: dict
    ip: str

    @property
    def partition_key(self) -> str:
        return 'user-session:' + self.user_id

    @property
    def sort_key(self) -> int:
        return self.date_created


class UserRegistry(RegistryDBBaseModel):
    user_id: str
    registry_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-registry:' + self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry:' + self.registry_id


class RegistryUser(RegistryDBBaseModel):
    registry_id: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()
    first_name: str
    last_name: str
    email: str
    role: UserRole
    is_admin: bool = False

    @property
    def partition_key(self) -> str:
        return 'registry-user:' + self.registry_id

    @property
    def sort_key(self) -> str:
        return 'user:' + self.user_id


class UserEmail(RegistryDBBaseModel):
    email: str
    user_id: str
    date_created: int = datetime.datetime.utcnow().timestamp()

    @property
    def partition_key(self) -> str:
        return 'user-email:' + self.email

    @property
    def sort_key(self) -> str:
        return self.user_id


class RegistryModel(RegistryDBBaseModel):
    id: str
    name: str
    description: str
    modified_date: float
    created_date: float
    members: int = 0
    active_patients: int = 0
    questionnaires: List[Measurement] = None
    akello_apps: List[AkelloApp] = []
    logo_url: Optional[str] = None

    @property
    def object_type(self) -> str:
        return 'registry'

    @property
    def sort_key(self) -> str:
        return 'metadata'


class PatientRegistry(RegistryDBBaseModel):
    id: Optional[str] = None
    patient_flag: Optional[FlagTypes] = None
    patient_mrn: str
    date_created: float = datetime.datetime.utcnow().timestamp()
    date_graduated: Optional[float] = None
    date_modified: float = datetime.datetime.utcnow().timestamp()
    payer: Optional[str] = None
    referring_provider_npi: Optional[str] = None
    first_name: str
    last_name: str
    phone_number: str
    email: str
    date_of_birth: str
    treatment_logs: List[TreatmentLog] = []
    event_logs: List[EventLog] = []
    audit_logs: List[AuditLog] = []
    flags: List[dict] = []
    status: PatientStatysTypes = PatientStatysTypes.enrolled
    initial_assessment: Optional[int] = None
    last_follow_up: Optional[int] = None
    last_psychiatric_consult: Optional[int] = None
    relapse_prevention_plan: Optional[int] = None
    total_sessions: Optional[int] = 0
    weeks_since_initial_assessment: Optional[int] = 0
    minutes_this_month: Optional[int] = 0
    schema_version: Optional[str] = None

    def toJson(self):
        data = json.loads(self.model_dump_json())
        data['partition_key'] = self.partition_key
        data['sort_key'] = self.sort_key
        return data

    @property
    def object_type(self):
        return 'registry-patient'

    @property
    def sort_key(self) -> str:
        return self.patient_mrn

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Foo",
                }
            ]
        }
    }
