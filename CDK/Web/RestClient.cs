using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;


using System.IO;
using System.Net;

namespace CDK.Web
{
    public class RestClient
    {

        public string Header { get; set; }
        public string Server { get; set; }
        public string Resource { get; set; }

        public RestClient(string header, string server, string resource)
        {
            Header = header;
            Server = server;
            Resource = resource;
        }

        
        public async Task RunAsync<T>()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(Server);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(Header));
                HttpResponseMessage response = await client.GetAsync(Resource);
                if (response.IsSuccessStatusCode)
                {
                    T varia = await response.Content.ReadAsAsync<T>();
                }

                
            }
        }

    }



    public class BaseClient
    {
        protected readonly string _endpoint;

        public BaseClient(string endpoint)
        {
            _endpoint = endpoint;
        }

        public T Get<T>(int top = 0, int skip = 0)
        {
            using (var httpClient = new HttpClient())
            {
                var endpoint = _endpoint + "?";
                var parameters = new List<string>();

                if (top > 0)
                    parameters.Add(string.Concat("$top=", top));

                if (skip > 0)
                    parameters.Add(string.Concat("$skip=", skip));

                endpoint += string.Join("&", parameters);

                var response = httpClient.GetAsync(endpoint).Result;

                return JsonConvert.DeserializeObject<T>(response.Content.ReadAsStringAsync().Result);
            }
        }

        public T Get<T>(int id)
        {
            using (var httpClient = new HttpClient())
            {
                var response = httpClient.GetAsync(_endpoint + id).Result;

                return JsonConvert.DeserializeObject<T>(response.Content.ReadAsStringAsync().Result);
            }
        }

        /*public string Post<T>(T data)
        {
            using (var httpClient = NewHttpClient())
            {
                var requestMessage = GetHttpRequestMessage<T>(data);

                var result = httpClient.PostAsync(_endpoint, requestMessage.Content).Result;

                return result.Content.ToString();
            }
        }

        public string Put<T>(int id, T data)
        {
            using (var httpClient = NewHttpClient())
            {
                var requestMessage = GetHttpRequestMessage<T>(data);

                var result = httpClient.PutAsync(_endpoint + id, requestMessage.Content).Result;

                return result.Content.ReadAsStringAsync().Result;
            }
        }*/

        public string Delete(int id)
        {
            using (var httpClient = new HttpClient())
            {
                var result = httpClient.DeleteAsync(_endpoint + id).Result;

                return result.Content.ToString();
            }
        }



    }




}
