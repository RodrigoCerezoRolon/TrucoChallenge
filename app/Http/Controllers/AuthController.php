<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      x={
 *          "logo": {
 *              "url": "https://via.placeholder.com/190x90.png?text=L5-Swagger"
 *          }
 *      },
 *      title="L5 OpenApi",
 *      description="L5 Swagger OpenApi description",
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="https://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 */
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Autenticación de usuario",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"username", "password"},
     *             @OA\Property(property="email", type="email", example="admin@test.com"),
     *             @OA\Property(property="password", type="string", example="password")
     *         )
     *     ),
     * @OA\Response(
     *     response="200",
     *     description="Respuesta exitosa",
     *     @OA\JsonContent(
     *         @OA\Property(property="access_token", type="string", example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"),
     *         @OA\Property(property="token_type", type="string", example="bearer"),
     *         @OA\Property(property="expires_in", type="integer", example=3600)
     *     )
     * ),
     *     @OA\Response(
     *         response="401",
     *         description="Error de autenticación"
     *     )
     * )
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            // 'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60,
            'name' => auth()->user()->name,
            'profile_id' => auth()->user()->profile_id
        ]);
    }
    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Registro de usuario",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "profile_id"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", example="password"),
     *             @OA\Property(property="profile_id", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Usuario registrado exitosamente",
     *               @OA\JsonContent(
     *             required={"name", "email", "password", "profile_id"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="email", example="john@example.com"),
     *             @OA\Property(property="profile_id", type="integer", example="1"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="422",
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object"),
     *         )
     *     )
     * )
     */
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'profile_id' => ['required']
        ], [
            'name.required' => 'El campo nombre es obligatorio.',
            'name.max' => 'El campo nombre no debe tener más de :max caracteres.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo electrónico válida.',
            'email.max' => 'El campo correo electrónico no debe tener más de :max caracteres.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'password.required' => 'El campo contraseña es obligatorio.',
            'password.string' => 'El campo contraseña debe ser una cadena de caracteres.',
            'password.min' => 'La contraseña debe tener al menos :min caracteres.',
            'profile_id.required' => 'El campo Perfil es obligatorio.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        return User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'profile_id' => $request->input('profile_id')
        ]);
    }
    /**
     * @OA\Post(
     *     path="/api/auth/generateReport",
     *     summary="Generar informe de juegos",
     *     @OA\RequestBody(
     *         required=true,
     *     @OA\JsonContent(
     *         @OA\Property(property="report", type="array", @OA\Items(
     *             @OA\Property(property="id", type="integer", example=78),
     *             @OA\Property(property="player_id", type="integer", example=8),
     *             @OA\Property(property="start_date", type="string", example="1999-12-15"),
     *             @OA\Property(property="finish_date", type="string", example="1993-04-05"),
     *             @OA\Property(property="points", type="integer", example=1),
     *             @OA\Property(property="is_winner", type="boolean", example=false),
     *             @OA\Property(property="amount_envido", type="integer", example=4),
     *             @OA\Property(property="amount_flower", type="integer", example=3),
     *             @OA\Property(property="created_at", type="string", example="2024-01-24T23:59:56.000000Z"),
     *             @OA\Property(property="updated_at", type="string", example="2024-01-24T23:59:56.000000Z")
     *         )),
     *         @OA\Property(property="user", type="object",
     *             @OA\Property(property="id", type="integer", example=8),
     *             @OA\Property(property="name", type="string", example="admin"),
     *             @OA\Property(property="email", type="string", example="admin@test.com"),
     *             @OA\Property(property="profile_id", type="integer", example=2),
     *             @OA\Property(property="created_at", type="string", example="2024-01-25T00:47:05.000000Z"),
     *             @OA\Property(property="updated_at", type="string", example="2024-01-25T00:47:05.000000Z")
     *         )
     *     )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Informe generado exitosamente",
     *         @OA\JsonContent(
     *              @OA\Property(property="report", type="array", @OA\Items(type="object")),
     *             @OA\Property(property="user", type="object"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="422",
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object"),
     *         )
     *     )
     * )
     */


    public function generateReport(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'start_date' => ['required', 'string'],
            'finish_date' => ['required', 'string'],
            'email' => [
                Rule::requiredIf(function () use ($request) {
                    // Verifica si el usuario tiene profile_id igual a 2
                    return auth()->user()->profile_id != 1;
                }),
            ],

        ], [
            'start_date.required' => 'El campo Fecha desde es obligatorio.',
            'finish_date.required' => 'El campo Fecha hasta es obligatorio.',
            'email.required' => 'El campo correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección de correo electrónico válida.',

        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $query = Game::where('start_date', '>=', $request->input('start_date'))
            ->where('finish_date', '<=', $request->input('finish_date'));
        $user = auth()->user();
        $playerSearched = null;
        if ($user && $user->profile_id != 1) {
            $playerSearched = User::where('email', $request->input('email'))->first();
            if ($playerSearched == null) {
                return response()->json(['errors' => ['email' => ['No hay jugador con ese email']]], 422);
            }
            $query->where('player_id', $playerSearched->id);
        }
        if ($user && $user->profile_id == 1) {
            $query->where('player_id', $user->id);
        }
        $report = $query->latest('created_at')->take(10)->get();
        return [
            'report' => $report,
            'user' => $playerSearched
        ];
    }
    /**
     * @OA\Post(
     *     path="/api/auth/createGame",
     *     summary="Crear nuevo juego",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"player_id", "start_date", "finish_date", "points", "is_winner", "amount_envido", "amount_flower"},
     *             @OA\Property(property="player_id", type="integer", example="1"),
     *             @OA\Property(property="start_date", type="string", example="2022-01-01"),
     *             @OA\Property(property="finish_date", type="string", example="2022-01-10"),
     *             @OA\Property(property="points", type="integer", example="100"),
     *             @OA\Property(property="is_winner", type="boolean", example="true"),
     *             @OA\Property(property="amount_envido", type="integer", example="3"),
     *             @OA\Property(property="amount_flower", type="integer", example="2"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="200",
     *         description="Juego creado exitosamente",
     *           @OA\JsonContent(
     *             required={"player_id", "start_date", "finish_date", "points", "is_winner", "amount_envido", "amount_flower"},
     *             @OA\Property(property="player_id", type="integer", example="1"),
     *             @OA\Property(property="start_date", type="string", example="2022-01-01"),
     *             @OA\Property(property="finish_date", type="string", example="2022-01-10"),
     *             @OA\Property(property="points", type="integer", example="100"),
     *             @OA\Property(property="is_winner", type="boolean", example="true"),
     *             @OA\Property(property="amount_envido", type="integer", example="3"),
     *             @OA\Property(property="amount_flower", type="integer", example="2"),
     *         )
     *     ),
     *     @OA\Response(
     *         response="422",
     *         description="Error de validación",
     *         @OA\JsonContent(
     *             @OA\Property(property="errors", type="object"),
     *         )
     *     )
     * )
     */
    public function createGame(Request $request)
    {
        $rules = [
            'player_id' => 'required|integer',
            'start_date' => 'required',
            'finish_date' => 'required',
            'points' => 'required|integer',
            'is_winner' => 'required',
            'amount_envido' => 'required|integer',
            'amount_flower' => 'required|integer',
        ];

        $customMessages = [
            'player_id.required' => 'El campo Jugador es obligatorio.',
            'start_date.required' => 'El campo Fecha Inicio es obligatorio.',
            'finish_date.required' => 'El campo Fecha Finalizacion es obligatorio.',
            'points.required' => 'El campo puntos es obligatorio.',
            'is_winner.required' => 'El campo Ganador es obligatorio.',
            'amount_envido.required' => 'El campo Envido es obligatorio.',
            'amount_flower.required' => 'El campo Flores es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $customMessages);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            return Game::create([
                'player_id' => $request->input('player_id'),
                'start_date' => $request->input('start_date'),
                'finish_date' => $request->input('finish_date'),
                'points' => $request->input('points'),
                'is_winner' => $request->input('is_winner'),
                'amount_envido' => $request->input('amount_envido'),
                'amount_flower' => $request->input('amount_flower'),
            ]);
        }
    }
   /**
 * @OA\Get(
 *     path="/api/auth/getPlayers",
 *     summary="Obtener jugadores",
 *     @OA\Response(
 *         response="200",
 *         description="Respuesta exitosa",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="name", type="string", example="admin")
 *             ),
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=6),
 *                 @OA\Property(property="name", type="string", example="Kelley Ankunding")
 *             )
 *         )
 *     )
 * )
 */

    public function getPlayers()
    {
        return User::select('id', 'name')->orderby('name', "ASC")->where('profile_id', 1)->get();
    }
}
