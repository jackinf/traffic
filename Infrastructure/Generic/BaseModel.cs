namespace Infrastructure.Generic
{
    public abstract class BaseModel
    {
        public string ExceptionMessage { get; set; }

        public bool HasError
        {
            get
            {
                return !string.IsNullOrWhiteSpace(ExceptionMessage);
            }
        }
    }
}
